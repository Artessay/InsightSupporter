import React  from "react";

export default class Episode extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }

    render() {
        return(
            <div className="Episode">
                hi
            </div>
            
        )
    }
}