import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

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
  State,
  Track,
} from 'react-native-track-player';
import {ThumbImage} from '@plx_tuber/assets/images';
import HeartIcon from '@plx_tuber/assets/icons/Heart.icon';
import BackwardIcon from '@plx_tuber/assets/icons/Backward.icon';
import ForwardIcon from '@plx_tuber/assets/icons/Forward.icon';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import LoopIcon from '@plx_tuber/assets/icons/Loop.icon';
import {PlayerScreenProps} from './types';
import ShareIcon from '@plx_tuber/assets/icons/Share.icon';
import MenuPlusIcon from '@plx_tuber/assets/icons/MenuPlus.icon';

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
});

const Player: React.FC<PlayerScreenProps> = ({navigation}) => {
  const theme = useThemeStore(state => state.theme);

  const insets = useSafeAreaInsets();

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const [, setTrackState] = useState<State>(State.None);

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

  const handleBack = () => navigation.goBack();

  return (
    <Box
      style={[styles.container, {backgroundColor: theme.background.default}]}>
      <Box row space="between" center mb={2} style={{paddingTop: insets.top}}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.back__btn, {backgroundColor: theme.background.back}]}>
          <LeftArrowIcon color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity>
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

        <Slider
          style={{width: '100%', marginTop: spacing(4)}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={colors.caribbeanGreen}
          maximumTrackTintColor={theme.background.seeAll}
          thumbImage={ThumbImage}
        />
        <Box row space="between" center>
          <Typography variant="caps3" color={theme.text.primary}>
            01:23
          </Typography>
          <Typography variant="caps3" color={colors.gray100}>
            02:30
          </Typography>
        </Box>

        <Box row space="between" center mt={3} pl={2} pr={2}>
          <HeartIcon color={colors.scorpion} />
          <BackwardIcon color={colors.white} />
          <Box
            style={{
              ...round(58),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.primary,
            }}>
            <PlayIcon
              width={responsiveSize(36)}
              height={responsiveSize(36)}
              color={colors.black}
            />
          </Box>
          <ForwardIcon color={colors.white} />
          <LoopIcon color={colors.scorpion} />
        </Box>

        <Box row space="between" center mt={1} pl={2} pr={2}>
          <ShareIcon color={colors.scorpion} />
          <MenuPlusIcon color={colors.scorpion} />
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
