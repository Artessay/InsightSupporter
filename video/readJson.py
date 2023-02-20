import json

DEBUG = True
path = r'./summary.json'

def readEvents(path : str)->list:
    jsonFile = open(path, "r")
    data = json.load(jsonFile)
    
    events : list = data['plays']
    if DEBUG: print("events number: ", len(events))

    return events

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
        print(type(event))
        if method == "who":
            if queryWho(key, event):
                result.append(event)
    return result

if __name__ == '__main__':
    print("json path: ", path)
    events = readEvents(path=path)
    # print(query("Christian Wood", events, "who"))
    