import json
from Clock import Clock
from timeParse import parseTime

DEBUG = True

actionType = []
# {
    # 'shot' : ['Shot', 'Layup', 'Dunk', 'Bank'],
    #         # ['Alley Oop', 'Cutting', 'Driving', 'Shot', 'Fade Away', 'Layup', 
    #         #   'Hook', 'Reverse', 'Running', 'Set Back', 'Tip', 'Turnaround'],
    # 'rebound' : ['Rebound'],
    # 'turnover' : ['Turnover', 'Traveling'],
    # 'ft' : ['Free Throw'],
    # 'foul' : ['Foul', 'Illegal Assist Turnover', 'Inbound Turnover', 'Offensive Charge', 'Technical'],
    # 'challenge' : ['Challenge'],
    # 'block' : []
# }

def readEvents(path : str)->list:
    if DEBUG: print("[json] json path: ", path)
    try:
        jsonFile = open(path, "r")
        data = json.load(jsonFile)    
    except:
        print("[json] json read failed: ", path)
        return []
    
    events : list = data['plays']
    if DEBUG: print("[json] events number: ", len(events))

    return events

def processTime(text):
    texts = text.split(':')
    if len(texts) == 1:
        return Clock(0, round(float(texts[0])))
    elif len(texts) == 2:
        return Clock((int)(texts[0]), (int)(texts[1]))
    else:
        print('Json Clock Program Error, debug needed')
        return Clock(0, 0)

def exertTime(events:list):
    '''
    return time series with form (clock_time:str, period:int)
    '''
    timeSeries = [(processTime(event['clock']['displayValue']), event['period']['number'], parseTime(event['wallclock'])) for event in events ]

    # verify
    # print(timeSeries[1])

    return timeSeries

def queryWho(who:str, event:dict)->bool:
    '''
    Here we just use string comparasion to query who.
    A better way to query who is to fully use the json data
    and compare the athlete id.
    '''
    text = event['text']
    if (text.find(who) >= 0):
        return True
    else:
        return False

def queryPeriod(when:int, event:dict)->bool:
    period = event['period']['number']
    return period == when

def queryWhat(what:str, event:dict)->bool:
    typeText:str = event['type']['text']
    actionList = actionType.get(what, None)
    if actionList is None:
        print('Action Type Error, Debug Needed')
        return False
    
    for action in actionList:    
        if (typeText.find(action) >= 0):
            return True
        else:
            return False

def query(key:str, events:list, method:str = 'who')->list:
    result = []
    for event in events:
        # print(type(event))
        if method == "who":
            if queryWho(key, event):
                result.append(event)
        elif method == "when":
            if queryPeriod(int(key), event):
                result.append(event)
        elif method == "where":
            pass
        elif method == "what":
            if queryWhat(key, event):
                result.append(event)
    return result

if __name__ == '__main__':
    path = r'./summary.json'
    # print("json path: ", path)
    
    ####################################### TEST 1 ###########################
    events = readEvents(path=path)
    
    queryList = [("Christian Wood", "who"), ("2", "when"), ("shot", "what")]
    for q in queryList:
        info, method = q
        events = query(info, events, method)
    
    for e in events:
        print(e['text'], e['clock']['displayValue'])
        print(e['wallclock'])
        print(e['type']['text'])
        print()
    
    if DEBUG: print("[query] events number: ", len(events))

    ####################################### TEST 2 ###########################
    events = readEvents(path=path)
    
    queryList = [("Christian Wood", "who"), ("rebound", "what")]
    for q in queryList:
        info, method = q
        events = query(info, events, method)
    
    for e in events:
        print(e['text'], e['clock']['displayValue'])
        print(e['wallclock'])
        print(e['type']['text'])
        print()
    
    if DEBUG: print("[query] events number: ", len(events))

    ####################################### TEST 3 ###########################
    events = readEvents(path=path)
    
    queryList = [("Kevin Porter Jr.", "who"), ("foul", "what")]
    for q in queryList:
        info, method = q
        events = query(info, events, method)
    
    for e in events:
        print(e['text'], e['clock']['displayValue'])
        print(e['wallclock'])
        print(e['type']['text'])
        print()
    
    if DEBUG: print("[query] events number: ", len(events))

    # c1 = processTime("1:03")
    # print(c1.m, c1.s)
    # c2 = processTime("57.2")
    # print(c2.m, c2.s)
    # print(c1 > c2)
    