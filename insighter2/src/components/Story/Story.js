import './Story.css'
import React from "react";
import GenerateButton from './GenerateButton/GenerateButton';

export default class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            insight: this.props.JsonData.Insight,
            insightType: this.props.JsonData.Insight_Type,
            taskType: this.props.JsonData.Task_Type
        }
    }

    render() {
        return(
            <div className="story">
                <div className='InsightType'>
                    {this.state.insightType}
                </div>
                <div className='TaskType'>
                    {this.state.taskType}
                </div>
                <textarea className='InputText' rows="2">
                    {this.state.insight}
                </textarea>
                <GenerateButton></GenerateButton>
            </div>
            
        )
    }
}
