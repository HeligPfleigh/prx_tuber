import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize} from '@plx_tuber/theme';
import {useQuery} from '@tanstack/react-query';
import {getTopSong} from '@plx_tuber/core/apis';
import {SongListItem} from '@plx_tuber/components/shared';

const styles = StyleSheet.create({
  seeAll__btn: {
    width: responsiveSize(50),
    height: responsiveSize(19),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TopSongs = () => {
  const query = useQuery(['topSong'], getTopSong);

  return (
    <>
      <Box row space="between" center mb={1.5}>
        <Typography variant="b5" color={colors.white} fontWeight="700">
          Top song
        </Typography>

        <TouchableOpacity style={styles.seeAll__btn}>
          <Typography variant="caps4" color={colors.white}>
            See all
          </Typography>
        </TouchableOpacity>
      </Box>

      {(query.data || []).slice(0, 5).map(item => (
        <Box mb={2}>
          <SongListItem
            artistName={item.artistName}
            thumbnail={item.image}
            songName={item.name}
          />
        </Box>
      ))}
    </>
  );
};

export default TopSongs;
