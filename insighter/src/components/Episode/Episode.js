import React  from "react";
import './Episode.css'

export default class Episode extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }

    render() {
        return(
            <div className="Episode">
                <div className='episodeHeader'>
                    <b>Episode 3</b>: Distribution of Shots by Quarter
                </div>
                <div className="episodeContent">
                    {/* content */}
                </div>
                <div className="episodeFooter">
                    Text: Embiid was dominating in the first half, hitting nine out of eleven, probably the biggest reason for the 76ers 26-point lead. But that was because he was making most of his mid-range jumpers(6/8), which is not very sustainable. He only hit 3/9 in the second half, and none of his shots were near the rim!
                </div>
            </div>
            
        )
    }
}