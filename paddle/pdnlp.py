from pprint import pprint
from paddlenlp import Taskflow

# Named Entity Recognition (NER)
schema = ['Person', 'Company']
ie_en = Taskflow('information_extraction', schema=schema, model='uie-base-en')
print(ie_en('In 1997, Steve was excited to become the CEO.'))