import './App.css';
import Head from './components/Head/Head';
import Story from './components/Story/Story';
import Data from './components/Data/Data'
import Episode from './components/Episode/Episode'

function App() {
  return (
    <div className='App'>
        <Head className='header'></Head>
        <div className='content'>
            <div class="item item-1">
                <Story></Story>
            </div>
            <div class="item item-2">
                <Data></Data>
            </div>
            <div class="item item-3">
                <Episode></Episode>
            </div>
            <div class="item item-4">4</div>
            <div class="item item-5">5</div>
        </div>
    </div>
  );
}

export default App;
