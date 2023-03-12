import os
import time
import openai

from config import *

def chat(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt = prompt,
        temperature=0,
        max_tokens=1024,
        frequency_penalty=0,
        presence_penalty=0
    )
    message = response["choices"][0]["text"].strip()
    
    return message

# def chat(prompt):
#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages = [
#             {"role": "system", "content": "资深篮球体育新闻记者"},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0,
#         max_tokens=1024,
#         frequency_penalty=0,
#         presence_penalty=0
#     )
#     message = response["choices"][0]["message"]["content"]
    
#     return message

def getResponse(prompt):
    while True:
        try:
            message = chat(prompt)
            break
        except Exception as exc:
            print(exc)
            time.sleep(5)
    #print(message)
    
    return message

class AI():
    def __init__(self) -> None:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
    def getLabel(self, insight):
        return getResponse(input_label + insight)
        
    def getTask(self, insight):
        return getResponse(input_task + insight)

    def getWhat(self, insight):
        return getResponse(input_what + insight)
        
    def getLogic(self, insight, task_type):
        return getResponse(input_logic(insight, task_type))
    
    def getRelation(self, episode1, episode2):
        return getResponse(input_relation(episode1, episode2))
