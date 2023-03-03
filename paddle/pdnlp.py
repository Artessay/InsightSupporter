from pprint import pprint
from paddlenlp import Taskflow

# Named Entity Recognition (NER)
schema = ['Player', 'Team', 'Time']
ie_en = Taskflow('information_extraction', schema=schema, model='uie-base-en')
# print(ie_en('In 1997, Steve was excited to become the CEO.'))
print(ie_en('The Utah Jazz have helped Lauri Markkanen unlock his offensive potential, becoming the kind of star they build a new foundation around.'))