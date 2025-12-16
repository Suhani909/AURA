# Dockerfile
FROM python:3.10-slim

WORKDIR /app

# system deps for sentencepiece, tokenizers (if needed)
RUN apt-get update && apt-get install -y build-essential git-lfs && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# install torch CPU wheel; adjust if you need GPU and provide right CUDA version
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

# expose port 7860 (HF Spaces uses 7860 or 80; either is fine)
EXPOSE 7860

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
