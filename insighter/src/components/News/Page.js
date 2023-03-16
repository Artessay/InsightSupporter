import React from 'react';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);        
    }

    
    render() {
        
        return(
            <div className="Page">
                hi
            </div>
            
        )
    }
}