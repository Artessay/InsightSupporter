import React  from "react";
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
                    {/* content */}
                </div>
                <div className="episodeFooter">
                    Text: {DataSL.Contents.Episode[CE-1].E_Text}
                </div>
            </div>
            
        )

};
export default Episode;