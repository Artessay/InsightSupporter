import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

prompt = """
Decide a Multilabel classification whether an uterance describing the insight type about NBA stats is a set of target labels(Single Player Performance,Whole Game Review,Strategy and Tactic,About Referee,Accident).
Output labels only.
Insight: """

while True:
    user_input = input(">>> ")
    if (user_input == 'quit'):
        break
    else:
        try:
            # print(prompt + user_input + '\n')
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt = prompt + user_input,
                temperature=0,
                max_tokens=2048,
                frequency_penalty=0,
                presence_penalty=0
            )
            print("\n" + response["choices"][0]["text"].strip())
        except Exception as exc: 
            print(exc)