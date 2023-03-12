import React  from "react";
import summary from '../data/summary_401360853.json' //assert {type:'JSON'};

export default class Data extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }

    render() {
        console.log(summary.boxscore)
        homeLogo = summary.boxscore.teams
        return(
            <div>
                <div
                    style={{
                        font: 'bold',
                        textSize: 28,
                        backgroundColor: 'gray',
                        width: 80,
                        height: 40,
                        borderRadius: 10,
                        textAlign: 'center',
                        textSizeAdjust: 10
                    }}
                >
                    Data
                </div>
                <img 
                    src="https://a.espncdn.com/i/teamlogos/nba/500/phi.png"
                    width={25}
                    alt='home team logo'
                ></img>
                <br></br>
                <div>1st 12:00</div>
                <br></br>
                <img 
                    src="https://a.espncdn.com/i/teamlogos/nba/500/cle.png"
                    width={25}
                    alt='home team logo'
                ></img>
            </div>
            
        )
    }
}
