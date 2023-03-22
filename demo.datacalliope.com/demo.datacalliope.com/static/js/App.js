import React from 'react';
import { Layout } from 'antd';
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import FactView from './view/FactView';
import StoryView from './view/StoryView';
import SequenceView from './view/SequenceView';
import PublishView from './view/PublishView';
import LayoutType from './constant/LayoutType';
import './App.css';

const { Sider, Content } = Layout;

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id, layout } = useParams();
  let publishView
  switch (layout) {
    case 'mobile':
      publishView = <PublishView layout={LayoutType.SLIDER_MOBILE} storyId={id} />
      break;

    case 'storyline':
      publishView = <PublishView layout={LayoutType.STORYLINE_WEB} storyId={id} />
      break;

    case 'factsheet':
      publishView = <PublishView layout={LayoutType.FACTSHEET} storyId={id} />
      break;

    default:
      break;
  }
  return (
    <div>
      {publishView}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/publish/mobile">
          <PublishView layout={LayoutType.SLIDER_MOBILE} />
        </Route>
        <Route exact path="/publish/storyline">
          <PublishView layout={LayoutType.STORYLINE_WEB} />
        </Route>
        <Route exact path="/publish/factsheet">
          <PublishView layout={LayoutType.FACTSHEET} />
        </Route>
        <Route exact path="/publish/:layout/:id" children={<Child />} />

        <Route exact path="/manual">
          <div id="calliope-header">
            <div id="calliope-logo"></div>
            <div id="calliope-title">Calliope</div>
          </div>
          <Layout style={{ height: 677 }}>
            <Sider width={300} style={{ backgroundColor: '#eee' }}>
              <FactView />
            </Sider>
            <Layout>
              <Content style={{ height: 677, backgroundColor: '#eee' }}>
                <StoryView manual={true}/>
              </Content>
            </Layout>
          </Layout>
          <Layout>
            <Layout style={{ height: 345 }}>
              <Content style={{ backgroundColor: '#eee' }} >
                <SequenceView manual={true}/>
              </Content>
            </Layout>
          </Layout>
        </Route>

        <Route path="/">
          <div id="calliope-header">
            <div id="calliope-logo"></div>
            <div id="calliope-title">Calliope</div>
          </div>
          <Layout style={{ height: 677 }}>
            <Sider width={300} style={{ backgroundColor: '#eee' }}>
              <FactView />
            </Sider>
            <Layout>
              <Content style={{ height: 677, backgroundColor: '#eee' }}>
                <StoryView />
              </Content>
            </Layout>
          </Layout>
          <Layout>
            <Layout style={{ height: 345 }}>
              <Content style={{ backgroundColor: '#eee' }} >
                <SequenceView />
              </Content>
            </Layout>
            {/* <Footer style={{ height: 20 }}>
              <div style={{ marginTop: -10 }}>
                Source Code <a href='https://github.com/sdq/datastory'>https://github.com/sdq/datastory</a>
              </div>
            </Footer> */}
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
