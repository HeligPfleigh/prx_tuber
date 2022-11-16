import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import SearchIcon from '@plx_tuber/assets/icons/Search.icon';
import {getArtists} from '@plx_tuber/core/apis';
import {IArtist} from '@plx_tuber/core/types';
import FastImage from 'react-native-fast-image';
import UserIcon from '@plx_tuber/assets/icons/User.icon';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {ArtistsScreenProps} from './types';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';

const styles = StyleSheet.create({
  search__container: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(8),
    borderWidth: responsiveSize(1),

    justifyContent: 'center',
    alignItems: 'center',
  },
  item__container: {
    height: responsiveSize(110),
    flex: 1 / 3,
    marginBottom: spacing(1),
  },
  item__con: {
    backgroundColor: colors.tundora,
    borderRadius: responsiveSize(5),
    marginRight: spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  avatar: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: responsiveSize(5),
  },
  name__container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist__name: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

const Artists: React.FC<ArtistsScreenProps> = ({navigation}) => {
  const {error, data, isLoading} = useQuery(['artists'], getArtists);
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    if (error) {
      toast.show('Fail to fetch data', {
        type: 'warning',
      });
    }
  }, [toast, error]);

  const openArtistDetail = (item: IArtist) => () => {
    navigation.navigate(NavigatorMap.Artist, {
      artist: item,
    });
  };

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const renderItem = ({item}: {item: IArtist}) => (
    <TouchableOpacity
      style={styles.item__container}
      onPress={openArtistDetail(item)}>
      <Box style={styles.item__con}>
        {item.avatar ? (
          <FastImage
            source={{uri: item.avatar}}
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <UserIcon color={colors.caribbeanGreen} />
        )}
        <Box style={styles.name__container}>
          <Typography
            color={colors.white}
            variant="caps3"
            style={styles.artist__name}>
            {item.nameArtist}
          </Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Box flex={1} color={theme.background.default} p={2}>
      <Box row space="between" center mb={2} style={{paddingTop: insets.top}}>
        <Typography variant="h6" color={theme.text.primary} fontWeight="700">
          Discover
        </Typography>

        <TouchableOpacity
          style={[styles.search__container, {borderColor: theme.primary}]}
          onPress={handleOpenSearch}>
          <SearchIcon color={theme.primary} />
        </TouchableOpacity>
      </Box>

      {isLoading ? (
        <Box flex={1} color={theme.background.default} p={2}>
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          data={data || []}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      )}
    </Box>
  );
};

export default withPlayerBar(Artists);
