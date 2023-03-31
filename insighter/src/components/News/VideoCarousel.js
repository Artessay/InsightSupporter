import React, { useState, useRef, useEffect } from 'react';

// const fs = require('fs');
// const path = require('path');

// const videoDirectory = '../../video';
// const videoExtensions = ['.mp4'];

// function getVideoPaths(directory, extensions) {
//   const files = fs.readdirSync(directory);

//   return files.filter(file => {
//     const extension = path.extname(file);
//     return extensions.includes(extension);
//   }).map(file => {
//     return path.join(directory, file);
//   });
// }

function VideoCarousel() {

    // // const videoPaths = getVideoPaths(videoDirectory, videoExtensions);
    // const videoPaths = ['../../video/18570.0.mp4']
    // console.log(videoPaths);
    
    // //   const videoPaths = ['path/to/video1.mp4', 'path/to/video2.mp4', 'path/to/video3.mp4'];

    // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // const videoRef = useRef(null);

    // useEffect(() => {
    //   videoRef.current.load();
    // }, [currentVideoIndex]);

    // const playVideo = () => {
    //   videoRef.current.play();
    // };

    // const pauseVideo = () => {
    //   videoRef.current.pause();
    // };

    // const handleNextVideo = () => {
    //   if (currentVideoIndex === videoPaths.length - 1) {
    //     setCurrentVideoIndex(0);
    //   } else {
    //     setCurrentVideoIndex(currentVideoIndex + 1);
    //   }
    // };

  return (
    <div>
      {/* <video ref={videoRef}>
        <source src={videoPaths[currentVideoIndex]} type="video/mp4" />
      </video> */}
      <video 
        src={require('../../video/35250.0.mp4')} 
        controls // 控制panel current
        width='80%'
        
      >
          video
      </video>
      {/* <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
      <button onClick={handleNextVideo}>Next Video</button> */}
    </div>
  );
}

export default VideoCarousel;