import './Page.css'
import React from 'react';
// import { useState } from 'react';
// import Relationship from '../charts/Relationship';
import PieChart from '../charts/piechart';
import BarChart from '../charts/barchart';
import StackedBarChart from '../charts/stackedBarChart';
import VideoCarousel from './VideoCarousel';

function ChartGenerator( { sentenceList } ) {
    let charts = [];
    // console.log(sentenceList)

    for (let i = 0; i < sentenceList.length; ++i) {
        // console.log(sentenceList[i])
        if (sentenceList[i].S_Ischart === "Yes") {
            // console.log("chart")
            // console.log(sentenceList[i].S_Chartneed)
            let needs = sentenceList[i].S_Chartneed;
            for (let j = 0; j < needs.length; ++j) {
                let need = needs[j];
                console.log(need.Chart_Type)
                if (need.Chart_Type === "Pie Chart") {
                    charts.push(
                        <PieChart Data = {need.Chart_Data[0]["1"]}></PieChart>
                    );
                } else if (need.Chart_Type === "Bar Chart") {
                    charts.push(
                        <BarChart Data = {need.Chart_Data[0]}></BarChart>
                    );
                } else if (need.Chart_Type === "Stacked Bar Chart") {
                    console.log("Yes, it is Stacked Bar Chart");
                    charts.push(
                        <StackedBarChart Data = {need.Chart_Data[0]}></StackedBarChart>
                    );
                    console.log(charts);
                } else {
                    // do nothing
                }
            }
        }
    }

    return <>{charts}</>;
}

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);        
    }
    
    render() {
        const {DataSL} = this.props;
        var listData = [];
        for (var i=0;i< DataSL.Contents.Episode.length;i++){
            listData.push(DataSL.Contents.Episode[i])
        }
        
        return(
            <div className="Page">
                <div className='title'>
                    <span></span>
                    <img 
                        src='./basketball.jpg' 
                        height={50}
                    ></img>
                    <span>
                        &nbsp;Joel Embiid's Shooting Distribution in the Game
                    </span>
                </div>
                
                <VideoCarousel className='video'></VideoCarousel>
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

                    <div className='paragraph'>
                        {
                            listData.map((item, index) => (
                                <div>
                                    <p className='subtitle'>
                                        {item.E_Title}:
                                    </p>
                                    {/* {
                                        for (let sentence in item.E_Sentences) {
                                            return <div>haha</div>
                                        }
                                    } */}
                                    <ChartGenerator sentenceList={item.E_Sentences}></ChartGenerator>
                                    <p className='subparagraph'>
                                        {item.E_Text}
                                    </p>
                                </div>
                            ))
                        }

                        {/* <p className='subtitle'>
                            Introduction:
                        </p>
                        <p className='subparagraph'>
                            The game being referred to is not specified, but based on the provided statistics, it appears to be a basketball game in which Joel Embiid played for approximately 35 minutes. Embiid had an impressive performance, scoring 35 points on 13 out of 19 field goal attempts, making 1 out of 3 three-point attempts and 8 out of 10 free throw attempts. He also grabbed 17 rebounds and dished out 5 assists, but had 3 turnovers and committed 3 personal fouls. Despite Embiid's strong individual performance, his team was trailing by 4 point, suggesting a closely contested game.
                        </p>

                        <p className='subtitle'>
                            Joel Embiid's Shot Attempts:
                        </p>
                        <PieChart></PieChart>
                        <p className='subparagraph'>
                            Joel Embiid attempted 19 shots in the game, and out of those 19 shots, he made 13 of them, resulting in a shooting percentage of 68.4%. To visually represent this, a pie chart can be used to show the percentage of shots made by Embiid.
                        </p>

                        <p className='subtitle'>
                            Distribution of Shots by Quarter:
                        </p>
                        <StackedBarChart></StackedBarChart>
                        <p className='subparagraph'>
                            Embiid was dominating in the first half, hitting nine out of eleven, probably the biggest reason for the 76ers 26-point lead. But that was because he was making most of his mid-range jumpers(6/8), which is not very sustainable. He only hit 3/9 in the second half, and none of his shots were near the rim!
                        </p>

                        <p className='subtitle'>
                            Distribution of Shots by Shot Type:
                        </p>
                        <BarChart></BarChart>
                        <p className='subparagraph'>
                            The game being referred to is not specified, but based on the provided statistics, it appears to be a basketball game in which Joel Embiid played for approximately 35 minutes. Embiid had an impressive performance, scoring 35 points on 13 out of 19 field goal attempts, making 1 out of 3 three-point attempts and 8 out of 10 free throw attempts. He also grabbed 17 rebounds and dished out 5 assists, but had 3 turnovers and committed 3 personal fouls. Despite Embiid's strong individual performance, his team was trailing by 4 point, suggesting a closely contested game.
                        </p>

                        <p className='subtitle'>
                            Analysis of Midrange Shots:
                        </p>
                        <p className='subparagraph'>
                            <b>Alternative texts</b>
                        </p>

                        <p className='subtitle'>
                            Conclusion:
                        </p>
                        <p className='subparagraph'>
                            <b>Alternative texts</b>
                        </p> */}
                    </div>
                </div>
                
            </div>
            
        )
    }
}