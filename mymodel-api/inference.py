# inference.py
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL_ID = "suhani700/xlmr-finetuned-checkpoint-5322"  # replace with your model repo id

device = "cuda" if torch.cuda.is_available() else "cpu"

print("Loading tokenizer and model from", MODEL_ID)
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_ID)
model.to(device)
model.eval()

def predict_text(text: str):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)
        top_conf, top_idx = torch.max(probs, dim=1)
    return {
        "label": int(top_idx.cpu().item()),
        "confidence": float(top_conf.cpu().item())
    }
