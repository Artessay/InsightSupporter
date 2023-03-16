import './Page.css'
import React from 'react';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);        
    }

    
    render() {
        
        return(
            <div className="Page">
                <div className='title'>
                    <span></span>
                    <img 
                        src='./basketball.jpg' 
                        height={50}
                    ></img>
                    <span>
                        Joel Embiid's Shooting Distribution in the Game
                    </span>
                </div>
                <div className='text'>
                    <p>Joel Embiid most shots were taken from mid range and happened in first quarter. </p>

                    <p>
                        <span 
                            style={{
                                color: 'red'
                            }}
                        >
                            by Writer's Name&nbsp;
                        </span>
                        <span>
                            on Mar. 17, 2023
                        </span>
                    </p>
                </div>
                
            </div>
            
        )
    }
}