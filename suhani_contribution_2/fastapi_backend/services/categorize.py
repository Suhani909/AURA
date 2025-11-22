def categorize_text(text: str) -> dict:
    t = text.lower()
    # location
    location_keywords = ["delhi", "mumbai", "bangalore", "kolkata", "india", "village", "city", "state", "country", "place"]
    is_location = any(w in t for w in location_keywords)


    # nature
    nature_keywords = ["weather", "rain", "storm", "temperature", "climate", "heat", "cold", "earthquake", "flood", "cyclone", "wind"]
    is_nature = any(w in t for w in nature_keywords)


    # sensitive
    religion_keywords = ["hindu", "muslim", "christian", "sikh", "religion"]
    caste_keywords = ["sc", "st", "obc", "caste"]
    politics_keywords = ["election", "vote", "modi", "bjp", "congress", "politics"]
    disaster_keywords = ["earthquake", "flood", "cyclone", "tsunami"]
    sensitivity = []
    if any(w in t for w in religion_keywords):
        sensitivity.append("religion")
    if any(w in t for w in caste_keywords):
        sensitivity.append("caste")
    if any(w in t for w in politics_keywords):
        sensitivity.append("politics")
    if any(w in t for w in disaster_keywords):
        sensitivity.append("natural_disaster")
    extra_cats = {
        "education": ["school", "college", "exam", "study"],
        "health": ["fever", "hospital", "doctor", "medicine"],
        "finance": ["loan", "bank", "money", "investment"],
        "farming": ["crop", "farmer", "seeds", "fertilizer"],
        "crime": ["murder", "theft", "crime", "police"],
        "technology": ["ai", "software", "app", "mobile", "computer"],
        "relationships": ["love", "breakup", "friend", "family"],
        "work": ["job", "salary", "office", "boss"],
        "travel": ["flight", "train", "hotel", "travel"]
}

    detected_extra = [cat for cat, words in extra_cats.items() if any(w in t for w in words)]
    # emotion
    emotion_map = {
        "happy": ["happy", "good", "great", "awesome", "nice"],
        "angry": ["angry", "mad", "irritated", "frustrated"],
        "sad": ["sad", "upset", "crying", "unhappy"],
        "confused": ["confused", "unsure", "don't understand"],
        "scared": ["scared", "fear", "terrified"],
        "stressed": ["stress", "tension", "pressure"]
    }
    detected_emotion = "neutral"
    for emo, words in emotion_map.items():
        if any(w in t for w in words):
            detected_emotion = emo
            break
    
    # BUILD RESULT
    result = {
        "location_related": is_location,
        "nature_related": is_nature,
        "sensitivity": sensitivity if sensitivity else "none",
        "emotion": detected_emotion
    }

    return result