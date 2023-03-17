import React  from "react";
import { useState } from 'react';
import ScoreTable from "../charts/Table/ScoreTable";
import './Episode.css'
import './Select.css'
import { Input, Button } from "antd";
import ChartSelect from "./ChartSelect";
import StackedBarChart from "../charts/stackedBarChart";

const { TextArea } = Input;

const Episode = props => {

    var {DataSL}=props
    //console.log(DataSL)
    var {CE}=props
    //console.log(CE)

    var Data_Episode_Name = [];
    for (var i=0;i< DataSL.Contents.Episode.length;i++){
        Data_Episode_Name.push(DataSL.Contents.Episode[i])
    }

    const [listData, setListData] = useState(Data_Episode_Name);

    const handleTextareaChange = (e) => {
        // console.log(e.target.value)
        // let newData = listData;
        listData[CE-1].E_Text = e.target.value;
        setListData(listData)

        let newData = listData;
        props.Datalist(newData)
    }
    
    // let [sentences, setSentences] = useState(listData[CE-1].E_Sentences);
    let sentences = listData[CE-1].E_Sentences;

    const handleInsert = () => {
        const newData = [...listData];
        const newItem = {
            "S_Insight": "Insight Text",
            "S_Task": "Task Type",
            "S_Ischart":"No"
        }
        const newSentences = [...newData[CE-1].E_Sentences, newItem];
        newData[CE-1].E_Sentences = newSentences;

        setListData(newData);
        props.Datalist(newData)
    }

    const handleDelete = (index) => {
        const newData = [...listData];
        newData[CE-1].E_Sentences.splice(index, 1);
        setListData(newData);
        props.Datalist(newData)
    }

        return(
            <div className="Episode">
                <div className='episodeHeader'>
                    <b>Episode {CE}</b>: {DataSL.Contents.Episode[CE-1].E_Title}
                </div>
                <div className="episodeContent">
                    <div className="selectPart">
                        {
                            sentences.map((item, index) => (
                                <div className="selectSection">
                                    <span className="selectNumber">
                                        {index+1}
                                    </span>
                                    <span className={item.S_Ischart === "Yes" ? "selectTaskEdit" : "selectTask"}>
                                        {item.S_Task}
                                    </span>
                                    <span className="selectDelete">
                                        <Button
                                            onClick={(e) => handleDelete(index)}
                                        ><b>-</b></Button>
                                    </span>
                                    <span className="selectText">
                                        {item.S_Insight}
                                    </span>
                                </div>
                            ))
                        }

                        <div className="selectSection">
                            <span className="selectNumber">
                                {sentences.length + 1}
                            </span>
                            <span className="selectDelete">
                                <Button
                                    // disabled={true}
                                    onClick={(e) => handleInsert()}
                                >+</Button>
                            </span>
                            <span className="selectText">
                                {/* {item.S_Insight} */}
                            </span>
                        </div>
                    </div>
                    
                    <ChartSelect className='selectDrop'></ChartSelect>
                    <div className="chartArea">
                        <ScoreTable></ScoreTable>
                    </div>
                    {/* <StackedBarChart className='chooseChart'></StackedBarChart> */}
                </div>
                <div className="episodeFooter">
                    <div style={{margin: 5}}>
                        {/* <b>Text:</b> {DataSL.Contents.Episode[CE-1].E_Text} */}
                        <TextArea
                            rows={4}
                            defaultValue={listData[CE-1].E_Text}
                            onInput={(e) => handleTextareaChange(e)}
                        ></TextArea>
                    </div>
                </div>
            </div>
            
        )

};
export default Episode;