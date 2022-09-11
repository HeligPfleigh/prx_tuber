import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Progress, Typography} from '../common';
import PauseIcon from '@plx_tuber/assets/icons/Pause.icon';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import {colors, responsiveSize} from '@plx_tuber/theme';
import TrackPlayer, {
  Event,
  PlaybackStateEvent,
  PlaybackTrackChangedEvent,
  State,
  Track,
  useProgress,
} from 'react-native-track-player';

const styles = StyleSheet.create({
  root: {
    minHeight: responsiveSize(52),
    backgroundColor: colors.black,
    width: '100%',
  },
  progress: {
    width: '100%',
  },
  song__thumbnail: {
    width: responsiveSize(85),
    height: responsiveSize(48),
  },
});

const PlayerBar = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [trackState, setTrackState] = useState<State>(State.None);
  const progress = useProgress();

  useEffect(() => {
    TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      async (e: PlaybackTrackChangedEvent) => {
        try {
          const trackObject = await TrackPlayer.getTrack(e.nextTrack || 0);

          setCurrentTrack(trackObject);
        } catch (error) {
          // TODO
        }
      },
    );

    TrackPlayer.addEventListener(
      Event.PlaybackState,
      (e: PlaybackStateEvent) => {
        setTrackState(e.state);
      },
    );

    const initialLoad = async () => {
      try {
        const trackIndex = await TrackPlayer.getCurrentTrack();
        if (trackIndex === null) {
          throw new Error();
        }
        const trackObject = await TrackPlayer.getTrack(trackIndex);
        const state = await TrackPlayer.getState();
        setTrackState(state);
        setCurrentTrack(trackObject);
      } catch (error) {
        // TODO
      }
    };

    initialLoad();
  }, []);

  const icon = useMemo(() => {
    switch (trackState) {
      case State.Playing:
        return <PauseIcon color={colors.white} />;
      case State.Paused:
      case State.Stopped:
        return <PlayIcon color={colors.white} />;
      default:
        return null;
    }
  }, [trackState]);

  const handlePlayPause = async () => {
    try {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (error) {
      // TODO
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.root}>
      <Progress
        style={styles.progress}
        fill={colors.bondiBlue}
        total={progress.duration || 1}
        current={progress.position || 0}
      />
      <Box flex={1} row center pr={2}>
        <FastImage
          source={{
            uri: String(currentTrack?.artwork || ''),
          }}
          style={styles.song__thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Box flex={1} ml={1.5} mr={1}>
          <Typography variant="b5" color={colors.white}>
            {currentTrack?.title || ''}
          </Typography>
          <Typography variant="caps4" color={colors.gray100}>
            {currentTrack?.artist || ''}
          </Typography>
        </Box>
        <TouchableOpacity onPress={handlePlayPause}>{icon}</TouchableOpacity>
      </Box>
    </TouchableOpacity>
  );
};

export default PlayerBar;
