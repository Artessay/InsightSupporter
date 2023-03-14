import React  from "react";
import './Data.css'
import summary from '../../data/summary_401360853.json' //assert {type:'JSON'};

export default class Data extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }

    render() {
        console.log(summary.boxscore)
        // homeLogo = summary.boxscore.teams
        return(
            <div className="Data">
                {/* <div
                    style={{
                        font: 'bold',
                        // textSize: 20,
                        backgroundColor: 'gray',
                        width: 80,
                        height: 40,
                        borderRadius: 10,
                        textAlign: 'center',
                        // textSizeAdjust: 10
                    }}
                >
                    Data
                </div> */}
                <div className="DataLabel">
                    Data
                </div>
                <img 
                    src="https://a.espncdn.com/i/teamlogos/nba/500/phi.png"
                    // width={25}
                    className='homeLogo'
                    // style={{
                    //     display: 'flex'
                    // }}
                    alt='home team logo'
                ></img>
                <div
                    className="dataTime"
                    // style={{
                    //     display: 'flex'
                    // }}
                >1st 12:00</div>
                <img 
                    src="https://a.espncdn.com/i/teamlogos/nba/500/cle.png"
                    // width={25}
                    className='awayLogo'
                    // style={{
                    //     display: 'flex'
                    // }}
                    alt='away team logo'
                ></img>
            </div>
            
        )
    }
}
