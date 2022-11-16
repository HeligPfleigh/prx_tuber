import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Typography} from '@plx_tuber/components';
import {responsiveSize} from '@plx_tuber/theme';
import {IPlaylist} from '@plx_tuber/core/types';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from './types';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {useThemeStore} from '@plx_tuber/stores/theme';

const styles = StyleSheet.create({
  seeAll__btn: {
    width: responsiveSize(60),
    height: responsiveSize(24),
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
  const navigation = useNavigation<HomeNavigationProps>();

  const theme = useThemeStore(state => state.theme);

  const handleOpenPlaylist = (item: IPlaylist) => () => {
    navigation.navigate(NavigatorMap.Playlist, {playlist: item});
  };

  const handleSeeAll = () => {
    navigation.navigate(NavigatorMap.Playlists, {
      title: 'Discover',
      playlists: playlist,
    });
  };

  const renderItem = ({item}: {item: IPlaylist}) => (
    <Box mr={2}>
      <TouchableOpacity
        style={styles.item__container}
        onPress={handleOpenPlaylist(item)}>
        <FastImage
          source={{uri: item.urlthumb}}
          style={styles.item__thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Box mt={1.5}>
          <Typography variant="b5" color={theme.text.primary}>
            {item.name}
          </Typography>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  return (
    <>
      <Box row space="between" center mb={1.5}>
        <Typography variant="b5" color={theme.text.primary} fontWeight="700">
          Discover
        </Typography>

        <TouchableOpacity
          style={[
            styles.seeAll__btn,
            {backgroundColor: theme.background.seeAll},
          ]}
          onPress={handleSeeAll}>
          <Typography variant="caps3" color={theme.text.primary}>
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
