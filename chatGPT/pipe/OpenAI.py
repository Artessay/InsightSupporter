import os
import openai

class OpenAI():
    def __init__(self) -> None:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        

