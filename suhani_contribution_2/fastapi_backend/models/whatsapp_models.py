from pydantic import BaseModel


class MessageInput(BaseModel):
    sender: str
    message: str


class TextRequest(BaseModel):
    text: str


# Backwards-compatible alias expected by `routers.whatsapp`
# Keep both names available until callers are updated.