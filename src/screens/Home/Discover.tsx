import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize} from '@plx_tuber/theme';
import {IPlaylist} from '@plx_tuber/core/types';

const styles = StyleSheet.create({
  seeAll__btn: {
    width: responsiveSize(50),
    height: responsiveSize(19),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  item__container: {
    width: responsiveSize(144),
  },
  item__thumbnail: {
    width: responsiveSize(144),
    height: responsiveSize(144),
    borderRadius: responsiveSize(10),
  },
});

interface IDiscoverProps {
  playlist: Array<IPlaylist>;
}

const Discover: React.FC<IDiscoverProps> = ({playlist}) => {
  const renderItem = ({item}: {item: IPlaylist}) => (
    <Box mr={2}>
      <TouchableOpacity style={styles.item__container}>
        <FastImage
          source={{uri: item.urlthumb}}
          style={styles.item__thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Box mt={1.5}>
          <Typography variant="b5" color={colors.white}>
            {item.name}
          </Typography>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  return (
    <>
      <Box row space="between" center mb={1.5}>
        <Typography variant="b5" color={colors.white} fontWeight="700">
          Discover
        </Typography>

        <TouchableOpacity style={styles.seeAll__btn}>
          <Typography variant="caps4" color={colors.white}>
            See all
          </Typography>
        </TouchableOpacity>
      </Box>

      <FlatList
        data={playlist}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Discover;
