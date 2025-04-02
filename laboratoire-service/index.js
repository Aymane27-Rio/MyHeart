const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://db:27017/laboratoire', { useNewUrlParser: true, useUnifiedTopology: true });

const TestSchema = new mongoose.Schema({
    patientId: String,
    resultat: String
});
const Test = mongoose.model('Test', TestSchema);

app.post('/tests', async (req, res) => {
    const test = new Test(req.body);
    await test.save();
    res.send(test);
});

app.listen(3002, () => console.log('Service Laboratoire démarré sur le port 3002'));
