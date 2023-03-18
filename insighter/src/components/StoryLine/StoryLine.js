import { Grid, List, Button, Card } from 'antd';
import { useState } from 'react';
// import './Card.css'

const { Item } = List;
const { useBreakpoint } = Grid;
const data = ['Item 1', 'Item 2', 'Item 3'];
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
    setListData([...listData, 'New Item']);
    //console.log(listData)
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
      style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll' }}
    >
    {
      listData.map((item, index) => (
        <div key={index} className='card'>
          <Card 
            title={
              <Button onClick={() => onTab1Change(index)}>Episode {index+1}: {item.E_Title} </Button>
            } 
            extra={
              <Button type="link" danger onClick={() => handleRemove(index)}>×</Button>} 
            style={{
              maxHeight: 100
            }}
            >
        {/*  <Card title={"Episode"+ item.Id +item.E_Title} extra={<Button type="link"  danger onClick={() => handleRemove(index)}>×</Button>} > */}
            <p>Card content</p>
            <p>Card content</p>
            <p 
            // style={{
            //   maxHeight: 200
            // }}
            // className='cardText'
            >
              {item.E_Text}
            </p>
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