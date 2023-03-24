import './Story.css'
import React from "react";
import GenerateButton from './GenerateButton/GenerateButton';

export default class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            insight: this.props.JsonData.Insight
        }
        console.log(this.props.Insight);
    }

    render() {
        return(
            <div className="story">
                <div className='InsightType'>
                    Single Player Performance
                </div>
                <div className='TaskType'>
                    Distribution
                </div>
                <textarea className='InputText' rows="2">
                    {this.state.insight}
                </textarea>
                <GenerateButton></GenerateButton>
            </div>
            
        )
    }
}
