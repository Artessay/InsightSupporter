import React  from "react";
import './Data.css'
// import summary from '../../data/summary_401360853.json' //assert {type:'JSON'};
import GameFlow from './GameFlow'
export default class Data extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }

    render() {
        //console.log(summary.boxscore)
        // homeLogo = summary.boxscore.teams
        return(
            <div className="Data">
                {}
                <div className="DataLabel">
                    Data
                </div>
                <img 
                    src="https://a.espncdn.com/i/teamlogos/nba/500/phi.png"
                    className='homeLogo'
                    alt='home team logo'
                ></img>
                <div
                    className="dataTime"
                >1st 12:00</div>
                <img 
                    src="https://a.espncdn.com/i/teamlogos/nba/500/cle.png"
                    className='awayLogo'
                    alt='away team logo'
                ></img>
                
                <GameFlow id={1}></GameFlow>
            </div>
            
        )
    }
}
