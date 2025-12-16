# app.py
from fastapi import FastAPI
from pydantic import BaseModel
from inference import predict_text

app = FastAPI(title="XLM-R Finetuned Inference")

class Request(BaseModel):
    text: str

@app.get("/")
def root():
    return {"status": "ok", "message": "XLM-R inference API running."}

@app.post("/predict")
def predict(req: Request):
    result = predict_text(req.text)
    return result
