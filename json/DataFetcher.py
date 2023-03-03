import json


class DataFetcher(object):
    def __init__(self, data) -> None:
        boxscore = data['boxscore']
        # for key in teams:
        #     print(key)
        # # teams, players

        teamHomeData = boxscore['teams'][0]
        teamAwayData = boxscore['teams'][1]
        # for key in teamAway:
        #     print(key)
        # # team, statistics

        self.teamHome = {
            'name' : teamHomeData['team']['displayName'],
            'logo' : teamHomeData['team']['logo'],
            'statistics' : [
                {
                    'label' : item['label'],
                    'value' : item['displayValue']
                } 
                for item in teamHomeData['statistics']
            ]
        }

        self.teamAway = {
            'name' : teamAwayData['team']['displayName'],
            'logo' : teamAwayData['team']['logo'],
            'statistics' : [
                {
                    'label' : item['label'],
                    'value' : item['displayValue']
                } 
                for item in teamAwayData['statistics']
            ]
        }

        playerHomeData = boxscore['players'][0]['statistics'][0]['athletes']
        playerAwayData = boxscore['players'][1]['statistics'][0]['athletes']

        self.playerLabel = [
            "MIN",
            "FG",
            "3PT",
            "FT",
            "OREB",
            "DREB",
            "REB",
            "AST",
            "STL",
            "BLK",
            "TO",
            "PF",
            "+/-",
            "PTS"
        ]

        self.boxScoreHome = []
        for athlete in playerHomeData:
            athleteData = athlete['athlete']
            self.boxScoreHome.append({
                'name' : athleteData['displayName'],
                'shortName' : athleteData['shortName'],
                'headshot' : athleteData['headshot']['href'],
                'position' : athleteData['position']['name'],
                'starter' : athlete['starter'],
                'didNotPlay' : athlete['didNotPlay'],
                'statistics' : athlete['stats']
            })
        
        self.boxScoreAway = []
        for athlete in playerAwayData:
            athleteData = athlete['athlete']
            # print(athleteData['displayName'])
            self.boxScoreAway.append({
                'name' : athleteData['displayName'],
                'shortName' : athleteData['shortName'],
                'headshot' : athleteData['headshot']['href'] if 'headshot' in athleteData else None,
                'position' : athleteData['position']['name'],
                'starter' : athlete['starter'],
                'didNotPlay' : athlete['didNotPlay'],
                'statistics' : athlete['stats']
            })

    def getPlayerLabel(self):
        return self.playerLabel
    
    def getHomeBoxScore(self):
        return self.boxScoreHome

    def getAwayBoxScore(self):
        return self.boxScoreAway
    
    def getTeamHomeStatus(self):
        return self.teamHome
    
    def getTeamAwayStatus(self):
        return self.teamAway

if __name__ == '__main__':
    path = r'./summary.json'
    jsonFile = open(path, "r")
    data = json.load(jsonFile)
    fetcher = DataFetcher(data)