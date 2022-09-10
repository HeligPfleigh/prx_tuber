import React from 'react';
import {TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {PlaylistsScreenProps} from './types';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {IPlaylist} from '@plx_tuber/core/types';
import FastImage from 'react-native-fast-image';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  header__container: {
    position: 'relative',
    minHeight: responsiveSize(70),
  },
  back__btn: {
    ...round(34),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: spacing(2),
    zIndex: 2,
  },
  item__container: {
    // width: '100%',
    marginRight: spacing(2),
  },
  item__thumbnail: {
    width: '100%',
    height: responsiveSize(164),
    borderRadius: responsiveSize(10),
  },
});

const Playlists: React.FC<PlaylistsScreenProps> = ({route, navigation}) => {
  const handlePressBack = () => navigation.goBack();
  const {title, playlists} = route.params;

  const handleOpenPlaylist = (item: IPlaylist) => () => {
    navigation.navigate(NavigatorMap.Playlist, {playlist: item});
  };

  const renderItem = ({item}: {item: IPlaylist}) => (
    <Box flex={1 / 2} mb={2}>
      <TouchableOpacity
        style={styles.item__container}
        onPress={handleOpenPlaylist(item)}>
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

  const renderHeader = (
    <SafeAreaView>
      <Box style={styles.header__container}>
        <TouchableOpacity onPress={handlePressBack} style={styles.back__btn}>
          <LeftArrowIcon color={colors.white} />
        </TouchableOpacity>

        <Box p={2} center middle flex={1}>
          <Typography variant="h6" color={colors.white} fontWeight="700">
            {title}
          </Typography>
        </Box>
      </Box>
    </SafeAreaView>
  );

  return (
    <Box color={colors.codGray} flex={1}>
      <FlatList
        data={playlists}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        numColumns={2}
        contentContainerStyle={{marginLeft: spacing(2)}}
      />
    </Box>
  );
};

export default Playlists;
