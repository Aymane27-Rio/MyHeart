from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Medecin(BaseModel):
    id: int
    nom: str
    specialite: str

@app.get("/medecins")
def get_medecins():
    return [{"id": 1, "nom": "Dr. Smith", "specialite": "Cardiologue"}]

@app.post("/medecins")
def create_medecin(medecin: Medecin):
    return {"message": "Médecin ajouté", "medecin": medecin}
