import React, { useState, useRef } from "react";
import "./styles/app.scss";

// Adding components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

// Import util
import data from "./data";

function App() {
  //Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Handler
  const timeUpdateHandler = (e) => {
    const time = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate Percentage

    const animationPercentage = Math.round(
      (Math.round(time) / Math.round(duration)) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: time,
      duration,
      animationPercentage,
    });
  };

  const songEndHandler = () => {
    let currentindex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[(currentindex + 1) % songs.length]);
    setTimeout(function () {
      audioRef.current.play();
    }, 2000);
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
