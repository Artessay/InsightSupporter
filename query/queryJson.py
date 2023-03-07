import readJson

'''
Joel Embiid most shots were taken from mid range and happened in first quarter.
'''

def queryJson(events):
    # queryList = [("Alperen Sengun", "who"), ("2", "when"), ("throw", "what")]
    queryList = [("Luka Doncic", "who"), ("shot", "what"), ("4", "when")]
    for q in queryList:
        info, method = q
        events = readJson.query(info, events, method)
    
    for e in events:
        print(e['text'], e['clock']['displayValue'])
        print(e['wallclock'])
        # print(parseTime(e['wallclock']))
        print(e['type']['text'])
        print()

    print("[query] events number: ", len(events))


if __name__ == '__main__':
    jsonPath = r'./summary.json'
    events = readJson.readEvents(path=jsonPath)
    queryJson(events)