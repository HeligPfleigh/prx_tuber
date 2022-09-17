import React, {useMemo, useState} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {MenuContext, withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AddCircleIcon from '@plx_tuber/assets/icons/AddCircle.icon';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import {
  FAVORITE_PLAYLIST_ID,
  useMyPlaylistsStore,
} from '@plx_tuber/stores/myPlaylists';
import {MyPlaylistsScreenProps} from './types';
import MusicIcon from '@plx_tuber/assets/icons/Music.icon';
import AddPlaylistModal from './AddPlaylistModal';
import AddPhotoIcon from '@plx_tuber/assets/icons/AddPhoto.icon';
import EditFillIcon from '@plx_tuber/assets/icons/EditFill.icon';
import ShareIcon from '@plx_tuber/assets/icons/Share.icon';
import DeleteIcon from '@plx_tuber/assets/icons/Delete.icon';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {useToast} from 'react-native-toast-notifications';

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
  const editPlaylistImage = useMyPlaylistsStore(
    state => state.editPlaylistImage,
  );

  const insets = useSafeAreaInsets();

  const toast = useToast();

  const handleOpenPlaylist = (id: number) => () => {
    navigation.navigate(NavigatorMap.MyPlaylist, {
      id,
    });
  };

  const [editedPlaylistId, setEditedPlaylistId] = useState<number>();

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number>();

  const handleMenuPress = (id: number) => () => setSelectedPlaylistId(id);

  const handleCloseAddPlaylistModal = () => {
    setEditedPlaylistId(undefined);
  };

  const menu = useMemo(() => {
    if (!selectedPlaylistId) {
      return [];
    }

    if (selectedPlaylistId === FAVORITE_PLAYLIST_ID) {
      return [
        {
          icon: <AddCircleIcon color={theme.primary} />,
          title: 'Add song',
          onPress: () => {
            setSelectedPlaylistId(undefined);
            navigation.navigate(NavigatorMap.Search);
          },
        },
      ];
    }

    return [
      {
        icon: <AddPhotoIcon color={theme.primary} />,
        title: 'Add playlist photo',
        onPress: async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
          });

          const images = (result.assets || [])
            .map(asset => asset.uri)
            .filter(Boolean) as Array<string>;

          if (images.length && selectedPlaylistId) {
            editPlaylistImage(selectedPlaylistId, images[0]);
            toast.show('Playlist image changed successfully!');
          }

          setSelectedPlaylistId(undefined);
        },
      },
      {
        icon: <EditFillIcon color={theme.primary} />,
        title: 'Rename playlist',
        onPress: () => {
          // fix open modal on ios
          setTimeout(() => {
            setEditedPlaylistId(selectedPlaylistId);
          }, 1000);
          setSelectedPlaylistId(undefined);
        },
      },
      {
        icon: <AddCircleIcon color={theme.primary} />,
        title: 'Add song',
        onPress: () => {
          setSelectedPlaylistId(undefined);
          navigation.navigate(NavigatorMap.Search);
        },
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
  }, [
    editPlaylistImage,
    navigation,
    removePlaylist,
    selectedPlaylistId,
    theme.primary,
    toast,
  ]);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background.default}]}>
      <Box row space="between" center mb={2} style={{paddingTop: insets.top}}>
        <Typography variant="h6" color={theme.text.primary} fontWeight="700">
          Playlist
        </Typography>

        <TouchableOpacity onPress={() => setEditedPlaylistId(-1)}>
          <AddCircleIcon color={theme.primary} />
        </TouchableOpacity>
      </Box>

      <TouchableOpacity onPress={handleOpenPlaylist(FAVORITE_PLAYLIST_ID)}>
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

          <TouchableOpacity
            hitSlop={{top: 5, left: 10, bottom: 5, right: 10}}
            onPress={() => setSelectedPlaylistId(FAVORITE_PLAYLIST_ID)}>
            <MenuIcon color={colors.blueBayoux} />
          </TouchableOpacity>
        </Box>
      </TouchableOpacity>

      {myPlaylists.map(playlist => (
        <TouchableOpacity
          key={playlist.id}
          onPress={handleOpenPlaylist(playlist.id)}>
          <Box mt={2} row center>
            <Box style={styles.item__avatar__container}>
              {playlist.urlthumb ? (
                <FastImage
                  source={{
                    uri: playlist.urlthumb,
                  }}
                  style={styles.item__avatar__container}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : (
                <MusicIcon color={colors.caribbeanGreen} />
              )}
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
        open={Boolean(editedPlaylistId)}
        onClose={handleCloseAddPlaylistModal}
        playlistId={editedPlaylistId}
        playlistName={
          myPlaylists.find(playlist => playlist.id === editedPlaylistId)?.name
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
