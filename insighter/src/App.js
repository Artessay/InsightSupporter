import './App.css';
import Head from './components/Head/Head';
import Story from './components/Story/Story';
import Data from './components/Data/Data'
import Episode from './components/Episode/Episode'
import StoryLine from './components/StoryLine/StoryLine'
import News from './components/News/News';
// import View from './components/View/View'

function App() {
  return (
    <div className='App'>
        <Head className='header'></Head>
        <div className='content'>
            <div className="item item-1">
                <Story></Story>
            </div>
            <div className="item item-2">
                <Data></Data>
            </div>
            <div className="item item-3">
                <Episode></Episode>
            </div>
            <div className="item item-4">
                {/* <View></View> */}
                <News></News>
            </div>
            <div className="item item-5">
                <StoryLine></StoryLine>
            </div>
        </div>
    </div>
  );
}

export default App;
