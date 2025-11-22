from fastapi import FastAPI
from routers.whatsapp import router as whatsapp_router
from routers.agent import router as agent_router
#from routers.sensitivity import router as sensitivity_router

app = FastAPI()

app.include_router(whatsapp_router, prefix="/whatsapp", tags=["WhatsApp"])
app.include_router(agent_router, prefix="/agent", tags=["Agent"])
#app.include_router(sensitivity_router, prefix="/sensitivity", tags=["Sensitivity"])


@app.get("/")
def read_root():
    return {"message": "Backend running successfully"}

