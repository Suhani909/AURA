from pydantic import BaseModel


class PromptRequest(BaseModel):
    system_prompt: str
    extra_text: str = ""

class AgentInput(BaseModel):
    text: str