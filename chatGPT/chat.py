import os
import openai
import requests

# Set up your API key and the OpenAI API endpoint
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_base = "https://api.openai.com/v1"

# Define your prompt and other parameters for the completion
prompt = "Hello, "
max_tokens = 5
temperature = 0.5

# Define the data payload for the API request
data = {
    "prompt": prompt,
    "max_tokens": max_tokens,
    "temperature": temperature
}

# Make the API request
response = openai.api_request("completions", data=data, verify=False)

# Print the response from the API
print(response)
