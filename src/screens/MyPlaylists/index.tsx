import React, {useState} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {MenuContext, withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AddCircleIcon from '@plx_tuber/assets/icons/AddCircle.icon';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';
import {MyPlaylistsScreenProps} from './types';
import MusicIcon from '@plx_tuber/assets/icons/Music.icon';
import AddPlaylistModal from './AddPlaylistModal';
import AddPhotoIcon from '@plx_tuber/assets/icons/AddPhoto.icon';
import EditFillIcon from '@plx_tuber/assets/icons/EditFill.icon';
import ShareIcon from '@plx_tuber/assets/icons/Share.icon';
import DeleteIcon from '@plx_tuber/assets/icons/Delete.icon';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';

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

const MyPlaylists: React.FC<MyPlaylistsScreenProps> = ({navigation}) => {
  const theme = useThemeStore(state => state.theme);

  const favorite = useMyPlaylistsStore(state => state.favorite);
  const myPlaylists = useMyPlaylistsStore(state => state.myPlaylists);
  const removePlaylist = useMyPlaylistsStore(state => state.removePlaylist);

  const insets = useSafeAreaInsets();

  const handleOpenPlaylist = (id: number) => () => {
    navigation.navigate(NavigatorMap.MyPlaylist, {
      id,
    });
  };

  const [openAddPlaylistModal, setOpenAddPlaylistModal] =
    useState<boolean>(false);

  const toggleAddPlaylistModal = () => setOpenAddPlaylistModal(prev => !prev);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number>();

  const handleMenuPress = (id: number) => () => setSelectedPlaylistId(id);

  const menu = [
    {
      icon: <AddPhotoIcon color={theme.primary} />,
      title: 'Add playlist photo',
    },
    {
      icon: <EditFillIcon color={theme.primary} />,
      title: 'Rename playlist',
      onPress: () => {
        toggleAddPlaylistModal();
      },
    },
    {
      icon: <AddCircleIcon color={theme.primary} />,
      title: 'Add song',
    },
    {
      icon: <ShareIcon color={theme.primary} />,
      title: 'Share playlist',
    },
    {
      icon: <DeleteIcon color={theme.primary} />,
      title: 'Remove playlist',
      onPress: () => {
        if (selectedPlaylistId) {
          removePlaylist(selectedPlaylistId);
          setSelectedPlaylistId(undefined);
        }
      },
    },
  ];

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background.default}]}>
      <Box row space="between" center mb={2} style={{paddingTop: insets.top}}>
        <Typography variant="h6" color={theme.text.primary} fontWeight="700">
          Playlist
        </Typography>

        <TouchableOpacity onPress={toggleAddPlaylistModal}>
          <AddCircleIcon color={theme.primary} />
        </TouchableOpacity>
      </Box>

      <TouchableOpacity onPress={handleOpenPlaylist(0)}>
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

      {myPlaylists.map(playlist => (
        <TouchableOpacity
          key={playlist.id}
          onPress={handleOpenPlaylist(playlist.id)}>
          <Box mt={2} row center>
            <Box style={styles.item__avatar__container}>
              <MusicIcon color={colors.caribbeanGreen} />
            </Box>

            <Box flex={1} ml={2} mr={2}>
              <Typography color={theme.text.primary}>
                {playlist.name}
              </Typography>
              <Typography color={colors.gray}>{`${playlist.songs.length} song${
                playlist.songs.length === 1 ? '' : 's'
              }`}</Typography>
            </Box>

            <TouchableOpacity
              hitSlop={{top: 5, left: 10, bottom: 5, right: 10}}
              onPress={handleMenuPress(playlist.id)}>
              <MenuIcon color={colors.blueBayoux} />
            </TouchableOpacity>
          </Box>
        </TouchableOpacity>
      ))}

      <AddPlaylistModal
        open={openAddPlaylistModal}
        onClose={toggleAddPlaylistModal}
        playlistId={selectedPlaylistId}
        playlistName={
          myPlaylists.find(playlist => playlist.id === selectedPlaylistId)?.name
        }
      />

      <MenuContext
        open={Boolean(selectedPlaylistId)}
        menuOptions={menu}
        onClose={() => setSelectedPlaylistId(undefined)}
      />
    </ScrollView>
  );
};

export default withPlayerBar(MyPlaylists);
