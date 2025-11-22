def create_system_prompt(cleaned_text: str, category: dict) -> str:
# Use the categorization to craft a system prompt for the LLM
    prompt = f"""
You are a helpful assistant.
User message: {cleaned_text}


Categorization:
- location_related: {category.get('location_related')}
- nature_related: {category.get('nature_related')}
- sensitivity: {category.get('sensitivity')}
- extra_categories: {category.get('extra_categories')}
- emotion: {category.get('emotion')}
- severity: {category.get('severity')}


Instructions:
1) Be careful with sensitive topics (religion, caste, politics, disasters). If content is sensitive, prefer safe, non-inflammatory language.
2) Match tone to emotion: angry->calm, sad->empathetic, scared->reassuring.
3) Produce a concise helpful reply suitable for sending over WhatsApp.


Produce only the assistant reply (no metadata).
"""
    return prompt