import React from "react";
import './MyDropdown.css'

export default class MyDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            options: [
                'Pie Chart',
                'Bar Chart',
                'Stacked Bar Chart',
                'Shot Chart'
            ]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <label>
                    <span className="labelText">
                        Chart Type:
                    </span>
                    
                    <select
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    >
                        {
                            this.state.options.map((item) => (
                                <option value={item}>{item}</option>
                            )) 
                        }
                    </select>
                </label>
            </div>
        )
    }
}