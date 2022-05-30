import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import imageOne from '../src/assets/images/ab67616d0000b273806c160566580d6335d1f16c.jpg';
import imageTwo from '../src/assets/images/lovely.jpg';
import imageThree from '../src/assets/images/fire_on_fire.jpg';

import songOne from '../src/assets/images/audio.mp3';
import songTwo from '../src/assets/images/Lovely.mp3';
import songThree from '../src/assets/images/Fire-On-Fire.mp3';

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background: 'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background: 'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const songs = [
  {
    title: 'HOPE',
    song: songOne,
    artist: 'XXXXXXTENTACION',
    image: imageOne,
  },
  {
    title: 'Lovely',
    song: songTwo,
    artist: 'Khalid, Billie Eilish',
    image: imageTwo,
  },
  {
    title: 'Fire on Fire',
    song: songThree,
    artist: 'Sam Smith',
    image: imageThree,
  },
];

export default function Home() {
  const theme = useTheme();
  const [position, setPosition] = React.useState(0);
  const [paused, setPaused] = React.useState(true);
  const [selectedMusic, setSelectedMusic] = React.useState(0);
  const [music, setMusic] = React.useState(new Audio(songs[selectedMusic].song));
  const [seek, setSeek] = React.useState(false);
  const [musicChanged, setMusicChanged] = React.useState(false);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const [duration, setDuration] = React.useState(0); // seconds

  useEffect(() => {
    music.addEventListener('loadedmetadata', () => {
      setDuration(music.duration);
    });
  }, [music]);

  //set position of the music while playing
  useEffect(() => {
    if (!paused && !seek) {
      const interval = setInterval(() => {
        setPosition(music.currentTime);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [music, paused, seek]);

  const playAudio = () => {
    if (paused) {
      //play from selected position

      music.currentTime = position;
      music.play();
    } else {
      music.pause();
    }

    music.onended = function () {
      setPaused(true);
      setPosition(0);
    };
  };

  const handleForward = () => {
    if (selectedMusic + 1 < songs.length) {
      setSelectedMusic(selectedMusic + 1);
    } else {
      setSelectedMusic(0);
    }

    music.pause();
    setPaused(true);
    setPosition(0);
  };

  useEffect(() => {
    if (music.src !== new Audio(songs[selectedMusic].song).src) {
      setMusic(new Audio(songs[selectedMusic].song));
      setMusicChanged(true);
    }
  }, [selectedMusic]);

  useEffect(() => {
    if (musicChanged) {
      setMusicChanged(false);
      music.play();
      setPaused(false);
      setPosition(0);
    }
  }, [musicChanged, music]);

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
    <Grid container style={{ height: '100vh' }} alignContent="center" sm={12}>
      <Box sx={{ width: '100%', overflow: 'hidden', paddingRight: '55px', paddingLeft: '20px' }}>
        <Widget>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CoverImage>
              <img alt="can't win - Chilling Sunday" src={songs[selectedMusic].image} />
            </CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <Typography noWrap>
                <b>{songs[selectedMusic].title}</b>
              </Typography>
              <Typography noWrap letterSpacing={-0.25}>
                Song by {songs[selectedMusic].artist}
              </Typography>
            </Box>
          </Box>
          <Slider
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => {
              setSeek(true);
              setPosition(value);
              music.currentTime = value;
            }}
            onChangeCommitted={(_, value) => {
              setSeek(false);
            }}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 8,
                height: 8,
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'}`,
                },
                '&.Mui-active': {
                  width: 20,
                  height: 20,
                },
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: -2,
            }}
          >
            <TinyText>{formatDuration(position).split('.')[0]}</TinyText>
            <TinyText>{formatDuration(duration - position).split('.')[0]}</TinyText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: -1,
            }}
          >
            <IconButton aria-label="previous song">
              <FastRewindRounded fontSize="large" />
            </IconButton>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              onClick={() => {
                setPaused(!paused);
                playAudio();
              }}
            >
              {paused ? (
                <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
              ) : (
                <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
              )}
            </IconButton>
            <IconButton aria-label="next song" onClick={() => handleForward()}>
              <FastForwardRounded fontSize="large" />
            </IconButton>
          </Box>
          <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
            <VolumeDownRounded htmlColor={lightIconColor} />
            <Slider
              aria-label="Volume"
              defaultValue={30}
              onChange={(_, value) => {
                music.volume = value / 100;
              }}
              sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  width: 24,
                  height: 24,
                  backgroundColor: '#fff',
                  '&:before': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: 'none',
                  },
                },
              }}
            />
            <VolumeUpRounded htmlColor={lightIconColor} />
          </Stack>
        </Widget>
        <WallPaper />
      </Box>
    </Grid>
  );
}
