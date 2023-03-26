import React, { useRef } from 'react';

const fs = require('fs');
const path = require('path');

const videoDirectory = '../../video';
const videoExtensions = ['.mp4'];

function getVideoPaths(directory, extensions) {
  const files = fs.readdirSync(directory);

  return files.filter(file => {
    const extension = path.extname(file);
    return extensions.includes(extension);
  }).map(file => {
    return path.join(directory, file);
  });
}

const videoPaths = getVideoPaths(videoDirectory, videoExtensions);
console.log(videoPaths);


function VideoPlayer() {
  const videoRef = useRef(null);

  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  return (
    <div>
      <video ref={videoRef}>
        <source src="path/to/video.mp4" type="video/mp4" />
      </video>
      <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
    </div>
  )
}

export default VideoPlayer;