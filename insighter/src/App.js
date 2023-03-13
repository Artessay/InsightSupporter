import './App.css';
import Head from './components/Head/Head';


function App() {
  return (
    <div className='App'>
        <Head className='header'></Head>
        <div className='content'>
            {/* <div>This is the end of Listening Comprehension</div> */}
            <div class="item item-1">1</div>
            <div class="item item-2">2</div>
            <div class="item item-3">3</div>
            <div class="item item-4">4</div>
            <div class="item item-5">5</div>
        </div>
            {/* Story Part */}
            {/* <div
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
            
            <Data></Data> */}
        {/* </Content> */}
        {/* <Footer
            style={{
            textAlign: 'center',
            }}
        >
            InsightSupporter ©2023
        </Footer> */}
    </div>
  );
}

export default App;
