import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@tanstack/react-query';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, round} from '@plx_tuber/theme';
import {getPlaylists} from '@plx_tuber/core/apis';
import {IPlaylist} from '@plx_tuber/core/types';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';

const styles = StyleSheet.create({
  seeAll__btn: {
    width: responsiveSize(50),
    height: responsiveSize(19),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlist: {
    position: 'relative',
    width: responsiveSize(264),
    height: responsiveSize(128),
    borderRadius: responsiveSize(10),
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomLeftRadius: responsiveSize(10),
    borderBottomRightRadius: responsiveSize(10),
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  play__btn: {
    ...round(34),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HotTopics = () => {
  const query = useQuery(['playlists'], getPlaylists);

  const renderItem = ({item}: {item: IPlaylist}) => (
    <Box mr={2}>
      <TouchableOpacity style={styles.playlist}>
        <FastImage
          source={{uri: item.urlthumb}}
          style={styles.playlist}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Box style={styles.actions}>
          <Typography variant="h6" color={colors.white} fontWeight="700">
            {item.name}
          </Typography>

          <TouchableOpacity style={styles.play__btn}>
            <PlayIcon color={colors.codGray} />
          </TouchableOpacity>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  if (!query.data) {
    return null;
  }

  return (
    <>
      <Box row space="between" center mb={1.5}>
        <Typography variant="b5" color={colors.white} fontWeight="700">
          Hot topics
        </Typography>

        <TouchableOpacity style={styles.seeAll__btn}>
          <Typography variant="caps4" color={colors.white}>
            See all
          </Typography>
        </TouchableOpacity>
      </Box>

      <FlatList
        data={query.data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HotTopics;
