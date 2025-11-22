from fastapi import APIRouter
from models.whatsapp_models import TextRequest
from services.filter import filter_text
from services.categorize import categorize_text


router = APIRouter(prefix="/nlp", tags=["nlp"])


@router.post("/filter_decode")
def filter_decode(req: TextRequest):
    cleaned = filter_text(req.text)
    return {"cleaned": cleaned}




@router.post("/categorize")
def categorize(req: TextRequest):
    return categorize_text(filter_text(req.text))