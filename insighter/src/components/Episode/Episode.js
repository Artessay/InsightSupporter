import React  from "react";
import ScoreTable from "../charts/Table/ScoreTable";
import './Episode.css'

const Episode = props => {

    var {DataSL}=props
    //console.log(DataSL)
    var {CE}=props
    //console.log(CE)
        return(
            <div className="Episode">
                <div className='episodeHeader'>
                    <b>Episode {CE}</b>: {DataSL.Contents.Episode[CE-1].E_Title}
                </div>
                <div className="episodeContent">
                    <ScoreTable></ScoreTable>
                </div>
                <div className="episodeFooter">
                    <div style={{margin: 5}}>
                        <b>Text:</b> {DataSL.Contents.Episode[CE-1].E_Text}
                    </div>
                </div>
            </div>
            
        )

};
export default Episode;