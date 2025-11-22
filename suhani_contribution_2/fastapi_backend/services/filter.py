import re




def filter_text(text: str) -> str:
    if not text:
        return ""
# basic cleaning: strip, normalize spaces, remove control chars
    s = text.strip()
    s = re.sub(r"\s+", " ", s)
    return s