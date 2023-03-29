import React  from "react";
import { useState } from 'react';
import ScoreTable from "../charts/Table/ScoreTable";
import './Episode.css'
import { Button } from "antd";
import SelectPanel from "./SelectPanel/SelectPanel";
import { GetChart } from "../charts/ChartGenerate";

function ChartCount(  sentenceList  ) {
    let chartNumber = 0;

    for (let i = 0; i < sentenceList.length; ++i) {
        if (sentenceList[i].S_Ischart === "Yes") {
            let needs = sentenceList[i].S_Chartneed;
            for (let j = 0; j < needs.length; ++j) {
                ++chartNumber;
            }
        }
    }

    return chartNumber;
}

function GetChartData( sentenceList ) {
    let datas = [];

    for (let i = 0; i < sentenceList.length; ++i) {
        if (sentenceList[i].S_Ischart === "Yes") {
            let needs = sentenceList[i].S_Chartneed;
            for (let j = 0; j < needs.length; ++j) {
                datas.push(needs[j].Chart_Data)
            }
        }
    }

    return datas;
}

const Episode = props => {

    var {DataSL}=props
    var {CE}=props
    let {updateFlag, setUpdateFlag}=props

    var Data_Episode_Name = [];
    for (var i=0;i< DataSL.Contents.Episode.length;i++){
        Data_Episode_Name.push(DataSL.Contents.Episode[i])
    }
    var [listData, setListData] = useState(DataSL.Contents.Episode);
    if(listData!=DataSL.Contents.Episode){
        setListData(DataSL.Contents.Episode)
    }
    //setListData(Data_Episode_Name)

    const handleTextareaChange = (e) => {
        let newData = listData;
        newData[CE-1].E_Text = e.target.value;
        setListData(newData)

        props.Datalist(newData)

        if (updateFlag === false)
            setUpdateFlag(true)
        else
            setUpdateFlag(false)
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

    function DeleteButton( {sentenceList} ) {
        if (sentenceList.length < 3) {
            return (
                <div className="selectSection">
                    <span className="selectNumber">
                        {sentenceList.length + 1}
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
            )
        } else {
            return <></>
        }
    }

    const handleInsightChange = (e, index) => {
        let newData = listData;
        newData[CE-1].E_Sentences[index].S_Insight = e.target.value;
        setListData(newData)

        props.Datalist(newData)
        
    }

    let counter = ChartCount(sentences);
    // console.log(counter)
    const chartNumbers = Array.from({ length:  counter }, (_, index) => index);

    let {figureNumber, setFigureNumber} = props;
    const handleFigureNumber = (number) => {
        setFigureNumber(number)
    }

    let t_ = GetChartData(sentences)
    let tableData = t_.length > 0 ? t_.at(figureNumber)[0] : [];

    const Tf = () => {
        if (listData[CE-1].E_Sentences) {
            return (
                <div className="chartArea">
                    <ScoreTable 
                        className="chartAreaTable"
                        ChartData={tableData}
                    ></ScoreTable>
                </div>
                )
            
        }
        else {
            return <></>
        }
    };

        return(
            <div className="Episode">
                <div className='episodeHeader'>
                    <b>Episode {CE}</b>: 
                    <div className="input-wrapper">
                        <textarea rows="1" cols="26" key={CE-1}>
                            {props.DataSL.Contents.Episode[CE-1].E_Title}
                        </textarea>
                    </div>
                    
                    
                </div>
                <div className="episodeContent">
                    <div className="selectPart">
                        {
                            sentences.map((item, index) => (
                                <div className="selectSection" key={index}>
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
                                        <textarea 
                                            key={CE-1}
                                            rows="1"
                                            onChange={(e) => handleInsightChange(e, index)}
                                            cols="80"
                                            value={item.S_Insight}
                                        >
                                        </textarea>
                                        
                                    </span>
                                </div>
                            ))
                        }

                        
                        <DeleteButton sentenceList = {listData[CE-1].E_Sentences} ></DeleteButton>
                    </div>
                    
                    <div className='selectDrop'>
                        <SelectPanel sentenceList = {listData[CE-1].E_Sentences}
                            index = {figureNumber}></SelectPanel>
                    </div>

                    <Tf></Tf>

                    <div className="chartButton">
                        {
                            chartNumbers.map((number) => {
                                // console.log(number, figureNumber)
                                const bgColor = (number === figureNumber) ? "rgb(255, 107, 107)" : "rgba(117, 117, 117, 0.3)"
                                return (
                                    <Button
                                        key={number}
                                        size="large"
                                        style={{
                                            backgroundColor: bgColor,
                                            marginBottom: 10
                                        }}
                                        value={number}
                                        onClick={(e) => {handleFigureNumber(number)}}
                                    >
                                        <div className="chartButtonText">
                                            {number+1}
                                        </div>
                                    </Button>
                                );
                            })
                        }
                        
                    </div>
                    
                    
                    
                    
                    <div className='chooseChart'>
                        <GetChart
                            key={CE-1}
                            sentenceList = {listData[CE-1].E_Sentences}
                            index = {figureNumber}
                        ></GetChart>
                    </div>
                    
                </div>
                <div className="episodeFooter">
                    <div style={{margin: 5}}>
                        <textarea
                            key={CE-1}
                            className='episodeTextArea'
                            rows={4}
                            onInput={(e) => handleTextareaChange(e)}
                        >
                            {listData[CE-1].E_Text}
                        </textarea>
                    </div>
                </div>
            </div>
            
        )

};
export default Episode;