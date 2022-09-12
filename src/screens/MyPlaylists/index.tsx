import React from 'react';
import {TouchableOpacity, ScrollView, StyleSheet} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AddCircleIcon from '@plx_tuber/assets/icons/AddCircle.icon';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing(2),
  },
  item__avatar__container: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    backgroundColor: colors.tundora,
    borderRadius: responsiveSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MyPlaylists = () => {
  const theme = useThemeStore(state => state.theme);
  const favorite = useMyPlaylistsStore(state => state.favorite);

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background.default}]}>
      <Box row space="between" center mb={2} style={{paddingTop: insets.top}}>
        <Typography variant="h6" color={theme.text.primary} fontWeight="700">
          Playlist
        </Typography>

        <TouchableOpacity>
          <AddCircleIcon color={theme.primary} />
        </TouchableOpacity>
      </Box>

      <TouchableOpacity>
        <Box mt={3} row center>
          <Box style={styles.item__avatar__container}>
            <HeartFillIcon color={colors.white} />
          </Box>

          <Box flex={1} ml={2} mr={2}>
            <Typography color={theme.text.primary}>Favorite</Typography>
            <Typography color={colors.gray}>{`${favorite.length} song${
              favorite.length === 1 ? '' : 's'
            }`}</Typography>
          </Box>

          <MenuIcon color={colors.blueBayoux} />
        </Box>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default withPlayerBar(MyPlaylists);
