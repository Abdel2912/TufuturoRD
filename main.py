from fastapi import FastAPI, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
import joblib
import pandas as pd
import json

app = FastAPI()

# Cargar el modelo y las columnas
model = joblib.load('career_recommendation_model.pkl')
model_columns = joblib.load('model_columns.pkl')

class UserResponses(BaseModel):
    question1: str
    question2: str
    question3: str
    question4: str
    question5: str
    question6: str
    question7: str
    question8: str
    question9: str
    question10: str
    question11: str
    question12: str

@app.post("/recommend")
async def recommend_career(user_responses: UserResponses):
    try:
        # Convertir las respuestas del usuario a un DataFrame
        user_data = pd.DataFrame([user_responses.dict()])

        # Asegurarse de que las columnas del DataFrame coincidan con las del modelo
        user_data = pd.get_dummies(user_data)
        user_data = user_data.reindex(columns=model_columns, fill_value=0)

        # Predecir la carrera usando el modelo cargado
        prediction = model.predict(user_data)
        career = prediction[0]

        return {"career": career}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn # type: ignore
    uvicorn.run(app, host="0.0.0.0", port=8000)

