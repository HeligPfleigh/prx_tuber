import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, Typography} from '@plx_tuber/components';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import PlayerMenuIcon from '@plx_tuber/assets/icons/PlayerMenu.icon';
import FastImage from 'react-native-fast-image';
import TrackPlayer, {
  Event,
  PlaybackStateEvent,
  PlaybackTrackChangedEvent,
  RepeatMode,
  State,
  Track,
} from 'react-native-track-player';
import HeartIcon from '@plx_tuber/assets/icons/Heart.icon';
import BackwardIcon from '@plx_tuber/assets/icons/Backward.icon';
import ForwardIcon from '@plx_tuber/assets/icons/Forward.icon';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import LoopIcon from '@plx_tuber/assets/icons/Loop.icon';
import {PlayerScreenProps} from './types';
import ShareIcon from '@plx_tuber/assets/icons/Share.icon';
import MenuPlusIcon from '@plx_tuber/assets/icons/MenuPlus.icon';
import PauseIcon from '@plx_tuber/assets/icons/Pause.icon';
import PlayerSlider from './PlayerSlider';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';
import {ISong} from '@plx_tuber/core/types';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import {PlaylistQueueModal} from './PlaylistQueueModal';
import {AddToPlaylistModal} from '@plx_tuber/components/shared';
import {SLEEPTIME} from '@plx_tuber/core/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing(2),
  },
  thumbnail: {
    width: '100%',
    height: responsiveSize(210),
  },
  back__btn: {
    ...round(34),
    justifyContent: 'center',
    alignItems: 'center',
  },
  play__pause__btn: {
    ...round(58),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  progress: {width: '100%', marginTop: spacing(4)},
});

const Player: React.FC<PlayerScreenProps> = ({navigation}) => {
  const theme = useThemeStore(state => state.theme);
  const favorite = useMyPlaylistsStore(state => state.favorite);
  const addToFavorite = useMyPlaylistsStore(state => state.addToFavorite);

  const insets = useSafeAreaInsets();

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [trackState, setTrackState] = useState<State>(State.None);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.Off);

  const [openPlaylistQueue, setOpenPlaylistQueue] = useState<boolean>(false);
  const togglePlaylistQueue = () => setOpenPlaylistQueue(prev => !prev);

  const [openAddToPlaylist, setOpenAddToPlaylist] = useState<boolean>(false);
  const toggleAddToPlaylist = () => setOpenAddToPlaylist(prev => !prev);

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
        const mRepeatMode = await TrackPlayer.getRepeatMode();
        setTrackState(state);
        setCurrentTrack(trackObject);
        setRepeatMode(mRepeatMode);
      } catch (error) {
        // TODO
      }
    };

    initialLoad();
  }, []);

  // useEffect(() => {
  //   // pause when it is sleeptime
  //   TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, () => {
  //     console.log({sleepTime});
  //     console.log(dayjs(sleepTime).isBefore(dayjs()));
  //     if (sleepTime && dayjs(sleepTime).isBefore(dayjs())) {
  //       TrackPlayer.pause();
  //     }
  //   });
  // }, [sleepTime]);

  const handleBack = () => navigation.goBack();

  const handlePlayPause = async () => {
    try {
      const state = await TrackPlayer.getState();

      await AsyncStorage.removeItem(SLEEPTIME); // remove sleeptime when press play again

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

  const handleBackwardClicked = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {}
  };

  const handleForwardClicked = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {}
  };

  const handleLoopClicked = () => {
    setRepeatMode(prev => {
      if (prev === RepeatMode.Off) {
        TrackPlayer.setRepeatMode(RepeatMode.Track);
        return RepeatMode.Track;
      } else {
        TrackPlayer.setRepeatMode(RepeatMode.Off);
        return RepeatMode.Off;
      }
    });
  };

  const handleAddToFavorite = () => {
    if (currentTrack) {
      addToFavorite(currentTrack as unknown as ISong);
    }
  };

  const handleShare = () => {
    if (currentTrack) {
      Share.share({
        message: `Check out this song on our site: ${
          currentTrack?.shareurl || ''
        }`,
      });
    }
  };

  const icon = useMemo(() => {
    switch (trackState) {
      case State.Playing:
        return (
          <PauseIcon
            color={colors.black}
            width={responsiveSize(36)}
            height={responsiveSize(36)}
          />
        );
      case State.Paused:
      case State.Stopped:
        return (
          <PlayIcon
            color={colors.black}
            width={responsiveSize(36)}
            height={responsiveSize(36)}
          />
        );
      default:
        return <ActivityIndicator />;
    }
  }, [trackState]);

  return (
    <Box
      style={[styles.container, {backgroundColor: theme.background.default}]}>
      <Box row space="between" center mb={2} style={{paddingTop: insets.top}}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.back__btn, {backgroundColor: theme.background.back}]}>
          <LeftArrowIcon color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlaylistQueue}>
          <PlayerMenuIcon color={theme.primary} />
        </TouchableOpacity>
      </Box>

      <Box flex={1} color={colors.black} middle>
        <FastImage
          source={{
            uri: String(currentTrack?.artwork) || '',
          }}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Box>

      <Box flex={1}>
        <Box center mt={4}>
          <Typography variant="b5" color={theme.text.primary}>
            {currentTrack?.title || ''}
          </Typography>
          <Typography variant="caps4" color={colors.gray100}>
            {currentTrack?.artist || ''}
          </Typography>
        </Box>

        <PlayerSlider />

        <Box row space="between" center mt={3} pl={2} pr={2}>
          <TouchableOpacity onPress={handleAddToFavorite}>
            {favorite.some(item => item.id === currentTrack?.id) ? (
              <HeartFillIcon color={colors.sunsetOrange} />
            ) : (
              <HeartIcon color={colors.scorpion} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBackwardClicked}>
            <BackwardIcon color={theme.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePlayPause}
            style={styles.play__pause__btn}>
            {icon}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForwardClicked}>
            <ForwardIcon color={theme.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLoopClicked}>
            <LoopIcon
              color={
                repeatMode === RepeatMode.Off
                  ? colors.scorpion
                  : colors.caribbeanGreen
              }
            />
          </TouchableOpacity>
        </Box>

        <Box row space="between" center mt={1} pl={2} pr={2}>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon color={colors.scorpion} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleAddToPlaylist}>
            <MenuPlusIcon color={colors.scorpion} />
          </TouchableOpacity>
        </Box>
      </Box>

      <PlaylistQueueModal
        open={openPlaylistQueue}
        onClose={togglePlaylistQueue}
      />

      <AddToPlaylistModal
        open={openAddToPlaylist}
        song={currentTrack as unknown as ISong}
        onClose={toggleAddToPlaylist}
      />
    </Box>
  );
};

export default Player;
