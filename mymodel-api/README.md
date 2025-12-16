# XLM-R Fine-Tuned Model

This model is a fine-tuned version of **XLM-Roberta** for misinformation detection.

## 📌 How to Use

### Load the model
```python
from transformers import AutoModelForSequenceClassification, AutoTokenizer

model_name = "suhani700/xlmr-finetuned-checkpoint-5322"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

inputs = tokenizer("Your text here", return_tensors="pt")
outputs = model(**inputs)
print(outputs.logits)
