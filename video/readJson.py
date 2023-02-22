import json

DEBUG = True

def readEvents(path : str)->list:
    if DEBUG: print("[json] json path: ", path)
    jsonFile = open(path, "r")
    data = json.load(jsonFile)
    
    events : list = data['plays']
    if DEBUG: print("[json] events number: ", len(events))

    return events

def exertTime(events:list):
    '''
    return time series with form (clock_time:str, period:int)
    '''
    timeSeries = [(event['clock']['displayValue'], event['period']['number']) for event in events ]

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


def query(key:str, events:list, method:str = 'who')->list:
    result = []
    for event in events:
        # print(type(event))
        if method == "who":
            if queryWho(key, event):
                result.append(event)
        elif method == "when":
            pass
        elif method == "where":
            pass
        elif method == "what":
            pass
    return result

if __name__ == '__main__':
    path = r'./summary.json'
    # print("json path: ", path)
    events = readEvents(path=path)
    # print(query("Christian Wood", events, "who"))
    