import React, { useEffect, useState } from 'react';
import './ControlIcons.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { IconButton, CircularProgress } from '@mui/material';
import { FastRewind } from '@mui/icons-material';
import { FastForwardSharp } from '@mui/icons-material';
import { PlayArrowSharp } from '@mui/icons-material';
import { PauseSharp } from '@mui/icons-material';
import { VolumeUp } from '@mui/icons-material';
import { VolumeOff } from '@mui/icons-material';
import { Fullscreen } from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';

const ControlIcons = ({
  playandpause,
  playing,
  rewind,
  fastForward,
  muting,
  muted,
  volumeChange,
  volumeSeek,
  volume,
  playRate,
  playerbackRate,
  fullScreenMode,
  onSeek,
  played,
  onSeekMouseUp,
  onSeekMouseDown,
  fullMovieTime,
  playedTime,
  previousVideo,
  nextVideo,
  buffering,
  handleUpVolume,
  handleDownVolume,
  exitFullScreenMode
}) => {
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log("1234567890",event.key);
      switch (event.key) {
        case ' ':
          playandpause();
          break;
        case 'ArrowLeft':
          rewind();
          break;
        case 'ArrowRight':
          fastForward();
          break;
        case 'm':
        case 'M':
          muting();
          break;
        case 'f':
        case 'F':
          fullScreenMode();
          break;
        case 'w':
        case 'W':
          exitFullScreenMode();
          break;
        case 'n':
        case 'N':
          nextVideo();
          break;
        case 'p':
        case 'P':
          previousVideo();
          break;
        case 'ArrowUp': 
          handleUpVolume();
          break;
        case 'ArrowDown': 
          handleDownVolume();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [
    playandpause,
    rewind,
    fastForward,
    muting,
    fullScreenMode,
    nextVideo,
    previousVideo,
    handleUpVolume,
    handleDownVolume,
    exitFullScreenMode
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'playbackrate-popover' : undefined;

  function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  const PrettoSlider = styled(Slider)({
    height: 5,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 16,
      width: 16,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  return (
    <div
      className="controls__div"
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      {controlsVisible && (
        <>
          {/* Top Controls */}
          <Grid container direction="row" alignItems="center" justifyContent="start" style={{ padding: 16 }}>
            <Grid item>
              <Typography variant="h5" style={{ color: 'silver' }}></Typography>
            </Grid>
          </Grid>

          {/* Middle Controls */}
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <IconButton className="controls__icons" aria-label="reqind" onClick={rewind}>
              <FastRewind fontSize="large" style={{ color: 'silver' }} />
            </IconButton>

            <IconButton className="controls__icons" aria-label="reqind" onClick={playandpause}>
              {playing ? (
                <PauseSharp fontSize="large" style={{ color: 'silver' }} />
              ) : (
                <PlayArrowSharp fontSize="large" style={{ color: 'silver' }} />
              )}
            </IconButton>

            <IconButton className="controls__icons" aria-label="reqind" onClick={fastForward}>
              <FastForwardSharp fontSize="large" style={{ color: 'silver' }} />
            </IconButton>
          </Grid>

          {/* Bottom Controls */}
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: 16 }}
          >
            <Grid item>
              <Typography variant="h5" style={{ color: 'silver' }}></Typography>
            </Grid>

            <Grid item xs={12}>
              <PrettoSlider
                min={0}
                max={100}
                value={played * 100}
                onChange={onSeek}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onSeekMouseUp}
                valueLabelDisplay="auto"
                components={{
                  ValueLabel: ValueLabelComponent,
                }}
              />
              <Grid container direction="row" justifyContent="space-between">
                <Typography variant="h7" style={{ color: 'silver' }}>
                  {playedTime}
                </Typography>
                <Typography variant="h7" style={{ color: 'silver' }}>
                  {fullMovieTime}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center" direction="row">
                <IconButton className="controls__icons" aria-label="reqind" onClick={playandpause}>
                  {playing ? (
                    <PauseSharp fontSize="large" style={{ color: 'silver' }} />
                  ) : (
                    <PlayArrowSharp fontSize="large" style={{ color: 'silver' }} />
                  )}
                </IconButton>

                <IconButton className="controls__icons" aria-label="reqind" onClick={muting}>
                  {muted ? (
                    <VolumeOff fontSize="large" style={{ color: 'silver' }} />
                  ) : (
                    <VolumeUp fontSize="large" style={{ color: 'silver' }} />
                  )}
                </IconButton>

                <Typography style={{ color: '#999', paddingTop: '5px' }}>{volume * 100}</Typography>
                <Slider
                  min={0}
                  max={100}
                  value={volume * 100}
                  onChange={volumeChange}
                  onChangeCommitted={volumeSeek}
                  className="volume__slider"
                  onKEeyPress
                />
              </Grid>
            </Grid>

            <Grid item>
              <Button variant="text" onClick={handlePopOver} className="bottom__icons">
                <Typography>{playerbackRate}X</Typography>
              </Button>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Grid container direction="column-reverse">
                  {[0.25, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((rate) => (
                    <Button variant="text" onClick={() => playRate(rate)}>
                      <Typography color={rate === playerbackRate ? 'secondary' : 'default'}>{rate}</Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>

              <IconButton  onClick={fullScreenMode}>
                <Fullscreen fontSize="large" style={{ color: 'silver' }}  />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton  aria-label="Previous" onClick={previousVideo}>
               <p style={{ color: 'silver' }}>Prev</p>
                <FastRewind fontSize="large" style={{ color: 'silver' }} />
              </IconButton>
              <IconButton  aria-label="Next" onClick={nextVideo}>
              <p style={{ color: 'silver' }}> Next</p>
                <FastForwardSharp fontSize="large" style={{ color: 'silver' }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}

      {buffering && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ControlIcons;
