import './App.css';
import Head from './components/Head';
import { Layout } from 'antd';
import Story from './components/Story';
import Data from './components/Data';
const { Header, Content, Footer } = Layout;


function App() {
  return (
    <div>
      <Layout className="layout">
            {/* <Header  className="header"> */}
                <div className="logo" />
                <Head></Head>
            {/* </Header> */}
            {/* <Content
                style={{
                    padding: '0 50px',
                }}
            > */}
                {/* Story Part */}
                <div
                    style={{
                        backgroundColor: 'gray',
                        width: 85,
                        height: 75,
                        borderRadius: 10,
                        textAlign: 'center',
                        textSizeAdjust: 10
                    }}
                >
                    Single Player Performance
                </div>

                <div
                    style={{
                        backgroundColor: 'chartreuse ',
                        width: 85,
                        height: 40,
                        borderRadius: 10,
                        textAlign: 'center',
                        textSizeAdjust: 10
                    }}
                >
                    Distribution
                </div>

                <Story
                    style={{
                        top: 100,
                        left: 82,
                        width: 53,
                        height: 120,
                        float: 'right'
                    }}
                ></Story>
                
                <Data></Data>
            {/* </Content> */}
            <Footer
                style={{
                textAlign: 'center',
                }}
            >
                InsightSupporter ©2023
            </Footer>
        </Layout>

        <div> a</div>
        <div> b</div>
        {/* display: inline */}
        {/* float:  */}
    </div>
  );
}

export default App;
