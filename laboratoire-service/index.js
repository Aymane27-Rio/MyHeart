require('dotenv').config(); // Load environment variables
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// MySQL Connection Using Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false // Disable SQL logging in console
});

// Define the Test Model (Table: tests)
const Test = sequelize.define('Test', {
    patientId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resultat: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tests',
    timestamps: false
});

// Sync Database (Create Table If Not Exists)
sequelize.sync()
    .then(() => console.log('✅ Connected to MySQL & Table is ready!'))
    .catch(err => console.error('❌ Database Connection Error:', err));

// API Routes
app.post('/tests', async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json(test);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/tests', async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.json(tests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Root Route for Checking Service Status
app.get('/', (req, res) => {
    res.send('✅ Service Laboratoire is running & connected to MySQL!');
});

// Start Server
app.listen(3002, () => console.log('🚀 Service Laboratoire running on port 3002'));
