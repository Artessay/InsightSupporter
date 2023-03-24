import './Story.css'
import React from "react";
import GenerateButton from './GenerateButton/GenerateButton';

export default class Story extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
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
                    Joel Embiid most shots were taken from mid range and happened in first quarter.
                </textarea>
                <GenerateButton></GenerateButton>
            </div>
            
        )
    }
}
