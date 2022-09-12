import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
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
import {useThemeStore} from '@plx_tuber/stores/theme';

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

  const theme = useThemeStore(state => state.theme);

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
        return <PauseIcon color={theme.primary} />;
      case State.Paused:
      case State.Stopped:
        return <PlayIcon color={theme.primary} />;
      default:
        return <ActivityIndicator />;
    }
  }, [trackState, theme]);

  const handlePlayPause = async () => {
    try {
      const state = await TrackPlayer.getState();

      switch (state) {
        case State.Playing:
          await TrackPlayer.pause();
          break;
        case State.Paused:
          await TrackPlayer.play();
          break;
        case State.Stopped:
          await TrackPlayer.seekTo(0);
          await TrackPlayer.play();
          break;
      }
    } catch (error) {
      // TODO
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.root, {backgroundColor: theme.background.default}]}>
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
          <Typography variant="b5" color={theme.text.primary}>
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
