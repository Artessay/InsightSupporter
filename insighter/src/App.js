import './App.css';
import Head from './components/Head';
import { Layout} from 'antd';
const { Header, Content, Footer } = Layout;


function App() {
  return (
    <div>
      <Layout className="layout">
            <Header  className="header">
                <div className="logo" />
                    <Head></Head>
            </Header>
            <Content
                style={{
                padding: '0 50px',
                }}
            >
                
                <div
                className="site-layout-content"
                // style={{
                //     background: colorBgContainer,
                // }}
                >
                Content
                </div>
            </Content>
            <Footer
                style={{
                textAlign: 'center',
                }}
            >
                InsightSupporter ©2023
            </Footer>
        </Layout>
    </div>
  );
}

export default App;
