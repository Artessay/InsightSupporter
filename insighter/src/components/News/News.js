import React from 'react';
import './News.css'
import { Button } from 'antd';
import Page from './Page';

const taskColor = {
    'Value': '#9747FF',
    'Proportion': '#FEB563',
    'Distribution': '#B3DE69',
    'Categorization': '#8DD3C7',
    'Trend': '#EEFF00',
    'Difference': '#22EEFF'
};

export default class News extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);

        this.state = {
            group: 1
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e) => {
        this.setState({
            group: e.target.value
        })

        console.log(e.target.value)
        
    }

    render() {
        
        const {DataSL} = this.props;
        // const {SetCE} = this.props;

        const listLength = DataSL.Contents.Episode.length;
        const numbers = Array.from({ length: listLength }, (_, index) => index);

        // numbers.map((number) => (
        //     console.log(DataSL.Contents.Episode[number].E_Sentences[0].S_Task)
        //     // console.log(taskColor[DataSL.Contents.Episode[number].E_Sentences[0].S_Task]);
        // ))
        
        return(
            <div className="News">
                <div className="newsAside">
                    <div className="ViewLabel">
                        View
                    </div>
                    
                    <div className='buttons'>
                        <Button shape='circle' onClick={(e) => this.handleClick(e)} value="0"
                        style={{backgroundColor: 'rgba(117, 117, 117, 0.3)'}}>0</Button>
                        {
                            numbers.map((number) => (
                                < >
                                    <div className='verticalLine'></div>
                                    <Button key={number} 
                                    style={{backgroundColor: taskColor[DataSL.Contents.Episode[number].E_Sentences[0].S_Task]}}
                                    shape='circle' onClick={(e) => this.handleClick(e)} value={number+1}>{number+1}</Button>
                                </>
                            ))
                        }
                    </div>
                    
                </div>
                <div 
                    className="newsMain"
                    // onScroll={handleScroll}
                >
                    <Page DataSL={DataSL}></Page>
                </div>
            </div>
            
        )
    }
}