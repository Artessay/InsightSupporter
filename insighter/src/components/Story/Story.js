import './Story.css'
import React  from "react";
// import { Input } from "antd";

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
                <textarea className='InputText'>
                    Joel Embiid most shots were taken from mid range and happened in first quarter.
                </textarea>
                {/* <Input
                    className='InputText'
                    type="text"
                    autoSize={{
                        minRows: 1,
                        maxRows: 2,
                    }}
                    placeholder="Joel Embiid most shots were taken from mid range and happened in first quarter."
                ></Input> */}
            </div>
            
        )
    }
}
