import React  from "react";
import { useRef,useEffect,useState } from 'react';
import ScoreTable from "../charts/Table/ScoreTable";
import './Episode.css'
import './Select.css'
import { Input, Button } from "antd";
// import ChartSelect from "./ChartSelect";
// import ChartGenerator from "../charts/ChartGenerate";
// import MyDropdown from "./MyDropdown/MyDropdown";
import SelectPanel from "./SelectPanel/SelectPanel";
import { GetChart } from "../charts/ChartGenerate";
// import GetChartData from "../charts/Table/TableData";

// const { TextArea } = Input;

function ChartCount(  sentenceList  ) {
    let chartNumber = 0;
    // console.log(sentenceList)

    for (let i = 0; i < sentenceList.length; ++i) {
        // console.log(sentenceList[i])
        if (sentenceList[i].S_Ischart === "Yes") {
            // console.log("chart")
            // console.log(sentenceList[i].S_Chartneed)
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
    console.log(sentenceList)

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
    //console.log(DataSL)
    var {CE}=props
    //console.log(CE)

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
        // console.log(e.target.value)
        let newData = listData;
        newData[CE-1].E_Text = e.target.value;
        setListData(newData)

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

        function DeleteButton( {sentenceList} ) {
            console.log(sentenceList.length)
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

    // console.log(sentences)
    let counter = ChartCount(sentences);
    console.log(counter)
    const chartNumbers = Array.from({ length:  counter }, (_, index) => index);

    let {figureNumber, setFigureNumber} = props;
    const handleFigureNumber = (number) => {
        // console.log(e.target)
        setFigureNumber(number)
    }

    let t_ = GetChartData(sentences)
    console.log(t_)
    let tableData = t_.length > 0 ? t_.at(figureNumber)[0] : [];
    // tableData = []
    // tableData = listData[3-1].E_Sentences[figureNumber].S_Chartneed[0].Chart_Data[0]

    console.log(tableData)
        return(
            <div className="Episode">
                <div className='episodeHeader'>
                    <b>Episode {CE}</b>: 
                    <div className="input-wrapper">
                        {/* <input 
                            type="text"
                            defaultValue=
                        ></input> */}
                        <textarea rows="1">
                            {DataSL.Contents.Episode[CE-1].E_Title}
                        </textarea>
                    </div>
                    
                    
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
                                        <textarea 
                                            rows="1"
                                            onChange={(e) => handleInsightChange(e, index)}
                                            cols="80"
                                        >
                                            {item.S_Insight}
                                        </textarea>
                                        
                                    </span>
                                </div>
                            ))
                        }

                        
                        <DeleteButton sentenceList = {listData[CE-1].E_Sentences} ></DeleteButton>
                    </div>
                    
                    <div className='selectDrop'>
                        {/* <ChartSelect ></ChartSelect> */}
                        {/* <MyDropdown></MyDropdown> */}
                        <SelectPanel></SelectPanel>
                    </div>

                    

                    <div className="chartButton">
                        {
                            chartNumbers.map((number) => (
                                <Button
                                    // type="primary"
                                    size="large"
                                    style={{
                                        backgroundColor: 'rgba(117, 117, 117, 0.3)',
                                        marginBottom: 10
                                    }}
                                    value={number}
                                    // onClick={(e) => {handleFigureNumber(e)}}
                                    
                                    onClick={(e) => {handleFigureNumber(number)}}
                                >
                                    <div className="chartButtonText">
                                        {number+1}
                                    </div>
                                </Button>
                            ))
                        }
                        
                    </div>
                    
                    <div className="chartArea">
                        <ScoreTable 
                            ChartData={tableData}
                        ></ScoreTable>
                    </div>
                    {/* <StackedBarChart className='chooseChart'></StackedBarChart> */}
                    <div className='chooseChart'>
                        {/* <ChartGenerator 
                            sentenceList = {listData[CE-1].E_Sentences}
                        ></ChartGenerator> */}
                        <GetChart
                            sentenceList = {listData[CE-1].E_Sentences}
                            index = {figureNumber}
                        ></GetChart>
                    </div>
                    
                </div>
                <div className="episodeFooter">
                    <div style={{margin: 5}}>
                        {/* <b>Text:</b> {DataSL.Contents.Episode[CE-1].E_Text} */}
                        {/* <TextArea
                            rows={4}
                            defaultValue={listData[CE-1].E_Text}
                            onInput={(e) => handleTextareaChange(e)}
                        ></TextArea> */}
                        <textArea
                            className='episodeTextArea'
                            rows={4}
                            // defaultValue={listData[CE-1].E_Text}
                            onInput={(e) => handleTextareaChange(e)}
                        >
                            {listData[CE-1].E_Text}
                        </textArea>
                    </div>
                </div>
            </div>
            
        )

};
export default Episode;