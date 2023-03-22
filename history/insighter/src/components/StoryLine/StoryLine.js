import { center } from '@antv/g2plot/lib/plots/sankey/sankey';
import { Grid, List, Button, Card } from 'antd';
import { useState } from 'react';
import ChartGenerator from "../charts/ChartGenerate";
// import './Card.css'
import close from '../../icon/cancel.png';
// const { Item } = List;
const { useBreakpoint } = Grid;
// const data = ['Item 1', 'Item 2', 'Item 3'];
const StoryLine = props => {

  const screens = useBreakpoint();
  var {DataSL}=props
  //console.log(DataSL)
  var Data_Episode_Name = [];
  for (var i=0;i< DataSL.Contents.Episode.length;i++){
    Data_Episode_Name.push(DataSL.Contents.Episode[i])
    //console.log( DataSL.Insight_Episodes[i])
  }

  const [listData,setListData] = useState(Data_Episode_Name);
//console.log(Data_Episode_Name)
  const handleAdd = () => {
    const newData = [...listData];
    newData.push({Id: String(DataSL.Contents.Episode.length+1), E_Title: 'New Episode', E_Sentences: [{S_Insight: "Insight Text", S_Task: 'Task Type', S_Ischart: 'No'}], E_Text: 'None'}
    )
    setListData(newData);
    props.Datalist(newData)

  };
  const onTab1Change = (key) => {
    //console.log(key)
    props.DataAll(key,listData)
    //props.DataAll(listData)
    //console.log(listData)
  };
  const handleRemove = (index) => {
    const newData = [...listData];
    newData.splice(index, 1);
    setListData(newData);
    props.Datalist(newData)
    //console.log(newData)
  };
  // const isLastItem = (index) => index === listData.length - 1;

  return (
    <div 
      // className='cardList'
      style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll',position: "relative" }}
    >
    {
      listData.map((item, index) => (
        <div key={index} className='card'>
          <Card 
            title={
              <div>
                <icon style={{dalignSelf: "flex-start", position: "relative", top: "3px", left: "-10px"}}>{index+1}</icon>
              <Button onClick={() => onTab1Change(index)} style={{
                fontSize: 10,
                width: 200,
                overflow:"hidden",
                
              }}>{item.E_Title}{} </Button>
              {<img src={close} style={{
                dalignSelf: "flex-start", position: "relative", top: "3px",right: "-10px"
              }} onClick={() => handleRemove(index)}></img>}
              </div>
            } 
            /* extra={
              <Button  style={{
                fontSize: 10,
                width: 20,
                marginLeft:0
              }} type="link" danger onClick={() => handleRemove(index)}>×</Button>}  */
            style={{
              height: 280,
              width: 300,
              marginLeft:20,
              marginTop:10,
              position: "relative",
              
            }}
            >
        {/*  <Card title={"Episode"+ item.Id +item.E_Title} extra={<Button type="link"  danger onClick={() => handleRemove(index)}>×</Button>} > */}
            {/* <p>Card content</p>
            <p>Card content</p> */}
            
            {item.E_Sentences.map((k, i) => (
        <p align="left" style={{
          height: 40,
          overflow:"hidden",
          marginTop:-10
        }}key={i}>{"-- "+ k.S_Insight}</p>
      ))}
     <div style={{ width: "40px", height: "30px", transform: "scale(0.2)" }}>
     <ChartGenerator 
                            sentenceList = {item.E_Sentences}
                        ></ChartGenerator>
</div>
    {/*   <p 
             style={{
               height: 40,
               overflow:"hidden"
             }}
            // className='cardText'
            >
              {item.E_Sentences[0].S_Insight}
            </p> */}
          </Card>
        </div>
    ))}
    {listData.length > 0 && (
      <div style={{ width: '200px', margin: '8px' }}>
        <Card >
        <Button type="dashed" onClick={handleAdd}>Add Item</Button>
        </Card>
      </div>
    )}
  </div>
  );
};

export default StoryLine;


/*  <div style={{ display: 'flex',overflowX: 'scroll' }}>
    <List
      grid={null}
      style={{ flexWrap: 'nowrap' }}
      dataSource={listData}
      renderItem={(item, index) => (
        
        <Item >
        <Card className="addable-grid-list-card"title={item} extra={<Button type="link" danger onClick={() => handleRemove(index)}>Remove</Button>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        {(index + 1) % (screens.xxl ? 6 : screens.xl ? 5 : screens.lg ? 4 : screens.md ? 3 : screens.sm ? 2 : 1) === 0 &&
            <Card>
              <Button type="dashed" onClick={handleAdd}>Add Item</Button>
            </Card>
          }
        {isLastItem(index) && (
              <Button type="dashed" onClick={handleAdd}>Add Item</Button>
            )}
      </Item>
      )}
    >
       {listData.length > 0 && (
        <Item>
          <Card>
            <Button type="dashed" onClick={handleAdd}>Add Item</Button>
          </Card>
        </Item>
      )}
      
    </List>
    </div> */