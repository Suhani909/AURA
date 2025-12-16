import os
import requests
from dotenv import load_dotenv

load_dotenv()

SUMIT_AGENT_URL = os.getenv("SUMIT_AGENT_URL")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# -------------------------------------------------------------------
# LLM CALL — placeholder
# -------------------------------------------------------------------
def call_prompt_chain(system_prompt: str) -> dict:
    """
    Placeholder for sending a prompt to LLM (OpenAI or others).
    Replace with real implementation later.
    """
    return {"text": f"LLM reply for: {system_prompt[:120]}"}


# -------------------------------------------------------------------
# SUMIT AGENT CALL — FIXED VERSION
# -------------------------------------------------------------------
def call_sumit_agent(llm_response: dict, original_text: str) -> dict:
    """
    Calls Sumit's multi-agent debater API.
    """

    if not SUMIT_AGENT_URL:
        return {"error": "SUMIT_AGENT_URL not configured", "debater_result": None}

    # Create payload inside the function (correct)
    payload = {
        "candidate": llm_response.get("text"),
        "original": original_text
    }

    try:
        r = requests.post(SUMIT_AGENT_URL, json=payload, timeout=10)
        r.raise_for_status()
        return r.json()

    except Exception as e:
        return {"error": str(e), "debater_result": None}
