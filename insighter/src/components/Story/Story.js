import './Story.css'
import React from "react";
import GenerateButton from './GenerateButton/GenerateButton';

const taskColor = {
    'Value': '#9747FF',
    'Proportion': '#FEB563',
    'Distribution': '#B3DE69',
    'Categorization': '#8DD3C7',
    'Trend': '#EEFF00',
    'Difference': '#22EEFF'
};

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
                <div className='TaskType'
                    style={{backgroundColor: taskColor[this.state.taskType]}}
                >
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
