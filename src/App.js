import * as React from 'react';
import {useState, useRef} from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import Container from '@mui/material/Container';
import './App.css';
import ControlIcons from './Components/ControlIcons';
import { videoUrls } from './data';


const format = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00';
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  } else {
    return `${mm}:${ss}`;
  }
};
function App() {
  const [playerstate, setPlayerState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playerbackRate: 0.25,
    played: 0,
    seeking: false,
    currentVideoIndex: 0 // Track current video index
  });

  const { playing, muted, volume, playerbackRate, played, seeking, currentVideoIndex } = playerstate;
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);

  const handlePlayAndPause = () => {
    setPlayerState({...playerstate, playing: !playerstate.playing});
  };

  const handleMuting = () => {
    setPlayerState({...playerstate, muted: !playerstate.muted});
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleVolumeChange = (e, newValue) => {
    setPlayerState({...playerstate, volume: parseFloat(newValue / 100), muted: newValue === 0 ? true : false});
  };

  const handleUpVolume = (e) => {
    setPlayerState({...playerstate, volume: playerstate.volume + 0.01, muted: playerstate.volume + 0.01 === 0 ? true : false});
  };

  const handleDownVolume = (e) =>{
    setPlayerState({...playerstate, volume: playerstate.volume - 0.01, muted: playerstate.volume - 0.01 === 0 ? true : false});
  }

  const handlePlayerRate = (rate) => {
    setPlayerState({...playerstate, playerbackRate: rate});
  };

  const handleFullScreenMode = () => {
    console.log("1234",playerDivRef);
    screenfull.toggle(playerDivRef.current);
  };

  const exitFullScreenMode = () => {
    screenfull.exit();
  };

  const handlePlayerProgress = (state) => {
    if (!playerstate.seeking) {
      setPlayerState({...playerstate, ...state});
    }
  };

  const handlePlayerSeek = (e, newValue) => {
    setPlayerState({...playerstate, played: parseFloat(newValue / 100)});
    playerRef.current.seekTo(parseFloat(newValue / 100));
  };

  const handlePlayerMouseSeekDown = (e) => {
    setPlayerState({...playerstate, seeking: true});
  };

  const handlePlayerMouseSeekUp = (e, newValue) => {
    setPlayerState({...playerstate, seeking: false});
    playerRef.current.seekTo(newValue / 100);
  };

  const handlePreviousVideo = () => {
    const newIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : videoUrls.length - 1;
    setPlayerState({...playerstate, currentVideoIndex: newIndex});
  };

  const handleNextVideo = () => {
    const newIndex = currentVideoIndex < videoUrls.length - 1 ? currentVideoIndex + 1 : 0;
    setPlayerState({...playerstate, currentVideoIndex: newIndex});
  };

  const currentPlayerTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const movieDuration =  playerRef.current ? playerRef.current.getDuration() : '00:00';
  const playedTime = format(currentPlayerTime);
  const fullMovieTime = format(movieDuration);

  return (
    <>
      <header className='header__section'>
        <p className='header__text'>Media Player</p>
      </header>
      <Container maxWidth="md">
        <div className='playerDiv' ref={playerDivRef}>
          <ReactPlayer
            width={'100%'}
            height='100%'
            ref={playerRef}
            url={videoUrls[currentVideoIndex]}
            playing={playing}
            volume={volume}
            playbackRate={playerbackRate}
            onProgress={handlePlayerProgress}
            muted={muted}/>

          <ControlIcons
            key={volume.toString()}
            playandpause={handlePlayAndPause}
            playing={playing}
            rewind={handleRewind}
            fastForward={handleFastForward}
            muting={handleMuting}
            muted={muted}
            volumeChange={handleVolumeChange}
            volumeSeek={handleVolumeChange} // Change this if you want a separate handler for volume seek
            volume={volume}
            playerbackRate={playerbackRate}
            playRate={handlePlayerRate}
            fullScreenMode={handleFullScreenMode}
            played={played}
            onSeek={handlePlayerSeek}
            onSeekMouseUp={handlePlayerMouseSeekUp}
            onSeekMouseDown={handlePlayerMouseSeekDown}
            playedTime={playedTime}
            fullMovieTime={fullMovieTime}
            seeking={seeking}
            previousVideo={handlePreviousVideo}
            nextVideo={handleNextVideo}
            handleUpVolume= {handleUpVolume}
            handleDownVolume= {handleDownVolume}
            exitFullScreenMode= {exitFullScreenMode}
          />
        </div>
      </Container>
    </>
  );
}

export default App;
