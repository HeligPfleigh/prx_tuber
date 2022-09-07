import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {PlaylistScreenProps} from './types';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import {useQuery} from '@tanstack/react-query';
import {getSongsOfJamendoPlaylist} from '@plx_tuber/core/apis';
import {ISong} from '@plx_tuber/core/types';
import {SongListItem} from '@plx_tuber/components/shared';

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

  const renderItem = ({item}: {item: ISong}) => (
    <Box p={2}>
      <SongListItem
        thumbnail={item.image}
        artistName={item.artistName}
        songName={item.name}
      />
    </Box>
  );

  const renderEmpty = (
    <Box flex={1} color={colors.codGray}>
      <ActivityIndicator />
    </Box>
  );

  const renderHeader = (
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
            {`${data?.length} track${data?.length === 1 ? '' : 's'}`}
          </Typography>
        </Box>
      </LinearGradient>
    </Box>
  );

  return (
    <Box flex={1} color={colors.codGray}>
      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
      />
    </Box>
  );
};

export default Playlist;
