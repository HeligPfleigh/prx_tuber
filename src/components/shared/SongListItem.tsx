import React from 'react';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity, StyleSheet} from 'react-native';

import {Box, Typography} from '../common';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';
import {colors, responsiveSize} from '@plx_tuber/theme';
import TrackPlayer from 'react-native-track-player';
import {useToast} from 'react-native-toast-notifications';

interface SongListItemProps {
  thumbnail: string;
  songName: string;
  artistName: string;
  url: string;
}

const styles = StyleSheet.create({
  song__thumbnail: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(5),
  },
});

const SongListItem: React.FC<SongListItemProps> = ({
  thumbnail,
  songName,
  artistName,
  url,
}) => {
  const toast = useToast();

  const handlePlayMusic = async () => {
    try {
      if (!url) {
        throw new Error('Cannot load track!');
      }

      await TrackPlayer.reset();

      await TrackPlayer.add({
        url,
        title: songName,
        artist: artistName,
        artwork: thumbnail,
      });

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
        <Box flex={1}>
          <FastImage
            source={{uri: thumbnail}}
            style={styles.song__thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>

        <Box ml={1} middle mr={1} flex={4}>
          <Typography color={colors.white}>{songName}</Typography>
          <Typography color={colors.gray}>{artistName}</Typography>
        </Box>

        <TouchableOpacity hitSlop={{top: 5, left: 10, bottom: 5, right: 10}}>
          <MenuIcon color={colors.blueBayoux} />
        </TouchableOpacity>
      </Box>
    </TouchableOpacity>
  );
};

export default SongListItem;
