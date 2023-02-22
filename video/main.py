
import readJson


DEBUG = True
path = r'./summary.json'



if __name__ == '__main__':
    events = readJson.readEvents(path=path)

    queryList = [("Alperen Sengun", "who")]
    for q in queryList:
        info, method = q
        events = readJson.query(info, events, method)
    
    if DEBUG: print("[query] events number: ", len(events))

    timeSeries = readJson.exertTime(events)

    
