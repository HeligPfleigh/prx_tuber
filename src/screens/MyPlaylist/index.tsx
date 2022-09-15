import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity, StyleSheet} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {colors, responsiveSize, round} from '@plx_tuber/theme';
import {MyPlaylistScreenProps} from './types';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';

const styles = StyleSheet.create({
  header__container: {
    position: 'relative',
    minHeight: responsiveSize(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  back__btn: {
    ...round(34),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu__btn: {},
});

const MyPlaylist: React.FC<MyPlaylistScreenProps> = ({navigation, route}) => {
  const myPlaylistId = route.params.id;

  const theme = useThemeStore(state => state.theme);
  const favorite = useMyPlaylistsStore(state => state.favorite);
  const myPlaylists = useMyPlaylistsStore(state => state.myPlaylists);

  const selectedPlaylist = myPlaylists.find(
    playlist => playlist.id === myPlaylistId,
  ) || {
    id: 0,
    name: 'Favorite',
    songs: favorite,
  };

  const insets = useSafeAreaInsets();

  const handlePressBack = () => navigation.goBack();

  return (
    <Box color={theme.background.default} flex={1} p={2}>
      <Box column style={{paddingTop: insets.top}} mb={2}>
        <Box style={[styles.header__container]}>
          <TouchableOpacity
            onPress={handlePressBack}
            style={[
              styles.back__btn,
              {backgroundColor: theme.background.back},
            ]}>
            <LeftArrowIcon color={colors.white} />
          </TouchableOpacity>

          <Box center middle flex={1}>
            <Typography
              variant="h6"
              color={theme.text.primary}
              fontWeight="700">
              {selectedPlaylist.name}
            </Typography>
          </Box>

          <TouchableOpacity style={styles.menu__btn}>
            <MenuIcon color={theme.primary} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default withPlayerBar(MyPlaylist);
