import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity, StyleSheet} from 'react-native';

import {Box, Typography} from '../common';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';
import {colors, responsiveSize} from '@plx_tuber/theme';
import TrackPlayer from 'react-native-track-player';
import {useToast} from 'react-native-toast-notifications';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {ISong} from '@plx_tuber/core/types';
import {SLEEPTIME} from '@plx_tuber/core/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useInterstitialAd} from '../ads/useInterstitialAd';

interface SongListItemProps {
  song: ISong;
  onMenuPress?: () => void;
}

const styles = StyleSheet.create({
  song__thumbnail: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(5),
    backgroundColor: colors.gray,
  },
});

const SongListItem: React.FC<SongListItemProps> = ({song, onMenuPress}) => {
  const toast = useToast();

  const theme = useThemeStore(state => state.theme);

  const {isLoaded, load, show, isClosed} = useInterstitialAd();

  useEffect(() => {
    load();
  }, [load, isClosed]);

  const handlePlayMusic = async () => {
    if (isLoaded) {
      show();
    }

    try {
      if (!song.audio) {
        throw new Error('Cannot load track!');
      }

      await TrackPlayer.reset();

      await TrackPlayer.add({
        ...song,
        url: song.audio,
        title: song.name,
        artist: song.artistName,
        artwork: song.image,
      });

      await AsyncStorage.removeItem(SLEEPTIME); // remove sleeptime when press play again
      await TrackPlayer.play();
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, {
          type: 'danger',
        });
      }
    }
  };

  return (
    <TouchableOpacity onPress={handlePlayMusic}>
      <Box row flex={1} center>
        <Box style={styles.song__thumbnail}>
          <FastImage
            source={{uri: song.image}}
            style={styles.song__thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>

        <Box ml={2} middle mr={1} flex={4}>
          <Typography variant="b5" color={theme.text.primary}>
            {song.name}
          </Typography>
          <Typography variant="caps4" color={colors.gray}>
            {song.artistName}
          </Typography>
        </Box>

        <TouchableOpacity
          hitSlop={{top: 5, left: 10, bottom: 5, right: 10}}
          onPress={onMenuPress}>
          <MenuIcon color={colors.blueBayoux} />
        </TouchableOpacity>
      </Box>
    </TouchableOpacity>
  );
};

export default SongListItem;
