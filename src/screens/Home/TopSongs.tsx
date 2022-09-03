import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize} from '@plx_tuber/theme';
import {useQuery} from '@tanstack/react-query';
import {getTopSong} from '@plx_tuber/core/apis';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';

const styles = StyleSheet.create({
  seeAll__btn: {
    width: responsiveSize(50),
    height: responsiveSize(19),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: responsiveSize(59),
    height: responsiveSize(59),
    borderRadius: responsiveSize(5),
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
        <TouchableOpacity key={item.id}>
          <Box mb={2} row flex={1} center>
            <Box flex={1}>
              <FastImage
                source={{uri: item.image}}
                style={styles.thumbnail}
                resizeMode={FastImage.resizeMode.cover}
              />
            </Box>

            <Box ml={1} middle mr={1} flex={4}>
              <Typography color={colors.white}>{item.albumName}</Typography>
              <Typography color={colors.gray}>{item.artistName}</Typography>
            </Box>

            <TouchableOpacity>
              <MenuIcon color={colors.blueBayoux} />
            </TouchableOpacity>
          </Box>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default TopSongs;
