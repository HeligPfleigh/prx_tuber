import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {PlaylistScreenProps} from './types';
import LinearGradient from 'react-native-linear-gradient';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import {useQuery} from '@tanstack/react-query';
import {getSongsOfJamendoPlaylist} from '@plx_tuber/core/apis';

const styles = StyleSheet.create({
  back__btn: {
    ...round(34),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  top__container: {
    position: 'relative',
    width: '100%',
    height: responsiveSize(340),
  },
  hero__container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: spacing(2),
    justifyContent: 'space-between',
  },
  playAll__btn: {
    backgroundColor: colors.white,
    marginVertical: spacing(1.5),
    paddingVertical: spacing(1),
    paddingHorizontal: spacing(5),
    borderRadius: responsiveSize(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Playlist: React.FC<PlaylistScreenProps> = ({navigation, route}) => {
  const handlePressBack = () => navigation.goBack();
  const {playlist} = route.params;
  const {data} = useQuery(['playlist', playlist.id], () =>
    getSongsOfJamendoPlaylist(playlist.id),
  );

  console.log(playlist.id, {data});

  return (
    <Box flex={1} color={colors.codGray}>
      <Box style={styles.top__container}>
        <FastImage
          source={{uri: playlist.urlthumb}}
          style={styles.avatar}
          resizeMode={FastImage.resizeMode.stretch}
        />

        <LinearGradient
          colors={['rgba(0, 0, 0, 0.0001)', colors.codGray]}
          style={styles.hero__container}>
          <TouchableOpacity onPress={handlePressBack} style={styles.back__btn}>
            <LeftArrowIcon color={colors.white} />
          </TouchableOpacity>

          <Box center>
            <Typography variant="h4" color={colors.white} fontWeight="700">
              {playlist.name}
            </Typography>

            <TouchableOpacity style={styles.playAll__btn}>
              <Box mr={1}>
                <PlayIcon color={colors.codGray} />
              </Box>
              <Typography color={colors.codGray} variant="h6" fontWeight="600">
                Play all
              </Typography>
            </TouchableOpacity>

            <Typography color={colors.gray} variant="caps3">
              31 tracks
            </Typography>
          </Box>
        </LinearGradient>
      </Box>
    </Box>
  );
};

export default Playlist;
