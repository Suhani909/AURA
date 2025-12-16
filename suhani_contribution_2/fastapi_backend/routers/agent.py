from fastapi import APIRouter
from models.agent_models import PromptRequest
from models.agent_models import AgentInput
from services.agent_caller import call_prompt_chain, call_sumit_agent


router = APIRouter(prefix="/agent", tags=["agent"])


@router.post("/prompt_chain")
def prompt_chain(req: PromptRequest):
    return call_prompt_chain(req.system_prompt)


@router.post("/misinfo_check")
def misinfo_check(req: PromptRequest):
# here req.system_prompt used to pass text to debater
    return call_sumit_agent(req.system_prompt, req.extra_text)

@router.post("/agent/process")
def process_agent(data: AgentInput):
    payload = data.dict()

    result = call_sumit_agent(payload)

    return {"response": result}
