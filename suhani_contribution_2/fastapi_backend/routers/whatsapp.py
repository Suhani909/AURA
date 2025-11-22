from fastapi import APIRouter
from models.whatsapp_models import MessageInput
from services.filter import filter_text
from services.categorize import categorize_text
from services.system_prompt import create_system_prompt
from services.agent_caller import call_sumit_agent

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])

@router.post("/process")
def process_whatsapp_message(data: MessageInput):
    filtered = filter_text(data.message)
    category = categorize_text(filtered)
    system_prompt = create_system_prompt(filtered, category)
    agent_output = call_sumit_agent(system_prompt)
    
    return {
        "filtered": filtered,
        "category": category,
        "agent_response": agent_output
    }
