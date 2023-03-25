import './App.css';
import Head from './components/Head/Head';
import Story from './components/Story/Story';
import Data from './components/Data/Data'
import Episode from './components/Episode/Episode'
import StoryLine from './components/StoryLine/StoryLine'
import News from './components/News/News';
import Test from '../src/data/Test_new.json' 
import { useState } from 'react';
import FlowGame from './components/charts/flowGame';

function App() {
    var [DataSL, setDataSL] = useState(Test)
    var [CE, setCE] = useState(1)
    var [figureNumber, setFigureNumber] = useState(0);

    var DataAll = (key, key2) => {
        setCE(key+1)
        var DataTmp1=DataSL
        DataTmp1.Contents.Episode=(key2)
        setDataSL(DataSL=DataTmp1)
        setFigureNumber(0)
        //console.log(DataSL)
    };

    var Datalist = (key) => {
        var DataTmp=DataSL
        DataTmp.Contents.Episode=(key)
        setDataSL(DataSL=DataTmp)
        setFigureNumber(0)
        //DataSL.Contents.Episode.filter
        //console.log(DataSL)
    };

  return (
    <div className='App'>
        <Head className='header' JsonData={DataSL}></Head>
        <div className='content'>
            <div className="item item-1">
                <Story JsonData={DataSL}></Story>
            </div>
            <div className="item item-2">
                <Data></Data>
            </div>
            <div className="item item-3">
                <Episode DataSL={DataSL} CE={CE} Datalist={Datalist} figureNumber={figureNumber} setFigureNumber={setFigureNumber}></Episode>
            </div>
            <div className="item item-4">
                <News DataSL={DataSL}></News>
            </div>
            <div className="item item-5">
                <StoryLine DataSL={DataSL} DataAll={DataAll} Datalist={Datalist}></StoryLine>
            </div>
            <div className='flowGame'>
                <FlowGame></FlowGame>
            </div>
        </div>
    </div>
  );
}


export default App;
