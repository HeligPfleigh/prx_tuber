import React, {useMemo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity, StyleSheet, ScrollView, Share} from 'react-native';

import {
  Box,
  Typography,
  MenuContext,
  SongListItem,
  withPlayerBar,
  AddPlaylistModal,
} from '@plx_tuber/components';

import {useThemeStore} from '@plx_tuber/stores/theme';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {MyPlaylistScreenProps} from './types';
import {
  FAVORITE_PLAYLIST_ID,
  useMyPlaylistsStore,
} from '@plx_tuber/stores/myPlaylists';
import MenuIcon from '@plx_tuber/assets/icons/Menu.icon';
import MusicIcon from '@plx_tuber/assets/icons/Music.icon';
import FastImage from 'react-native-fast-image';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import AddIcon from '@plx_tuber/assets/icons/Add.icon';
import TrackPlayer from 'react-native-track-player';
import AddCircleIcon from '@plx_tuber/assets/icons/AddCircle.icon';
import AddPhotoIcon from '@plx_tuber/assets/icons/AddPhoto.icon';
import {launchImageLibrary} from 'react-native-image-picker';
import EditFillIcon from '@plx_tuber/assets/icons/EditFill.icon';
import ShareIcon from '@plx_tuber/assets/icons/Share.icon';
import DeleteIcon from '@plx_tuber/assets/icons/Delete.icon';
import {ISong} from '@plx_tuber/core/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing(2),
  },
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
  thumbnail__container: {
    width: responsiveSize(170),
    height: responsiveSize(170),
    backgroundColor: colors.tundora,
    borderRadius: responsiveSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playAll__btn: {
    backgroundColor: colors.white,
    marginVertical: spacing(1.5),
    paddingVertical: spacing(1),
    paddingHorizontal: spacing(5),
    borderRadius: responsiveSize(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSong__btn: {
    marginTop: spacing(1.5),
    paddingVertical: spacing(1),
    paddingHorizontal: spacing(3),
    borderWidth: 1,
    borderRadius: responsiveSize(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  song__thumbnail: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(5),
    backgroundColor: colors.caribbeanGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MyPlaylist: React.FC<MyPlaylistScreenProps> = ({navigation, route}) => {
  const myPlaylistId = route.params.id;

  const theme = useThemeStore(state => state.theme);
  const favorite = useMyPlaylistsStore(state => state.favorite);
  const myPlaylists = useMyPlaylistsStore(state => state.myPlaylists);
  const editPlaylistImage = useMyPlaylistsStore(
    state => state.editPlaylistImage,
  );
  const removePlaylist = useMyPlaylistsStore(state => state.removePlaylist);
  const removeSongFromPlaylist = useMyPlaylistsStore(
    state => state.removeSongFromPlaylist,
  );

  const selectedPlaylist = myPlaylists.find(
    playlist => playlist.id === myPlaylistId,
  ) || {
    id: FAVORITE_PLAYLIST_ID,
    name: 'Favorite',
    songs: favorite,
  };

  const [openPlaylistMenu, setOpenPlaylistMenu] = useState<boolean>(false);
  const togglePlaylistMenu = () => setOpenPlaylistMenu(prev => !prev);

  const [openChangeNameModal, setOpenChangeNameModal] =
    useState<boolean>(false);
  const toggleChangeNameModal = () => setOpenChangeNameModal(prev => !prev);

  const [selectedSong, setSelectedSong] = useState<ISong>();

  const insets = useSafeAreaInsets();

  const handlePressBack = () => navigation.goBack();

  const handleAddSong = () => navigation.navigate(NavigatorMap.Search);

  const handlePlayAll = async () => {
    try {
      await TrackPlayer.reset();

      await TrackPlayer.add(
        selectedPlaylist.songs
          .filter(item => Boolean(item.audio))
          .map(item => ({
            ...item,
            url: item.audio,
            title: item.name,
            artist: item.artistName,
            artwork: item.image,
          })),
      );

      await TrackPlayer.play();
    } catch (error) {
      // TODO
    }
  };

  const content = () => {
    if (!selectedPlaylist.songs.length) {
      return (
        <Box center>
          <Typography variant="b5" color={theme.text.primary}>
            There is no song in your playlist
          </Typography>
          <TouchableOpacity
            style={[styles.addSong__btn, {borderColor: theme.primary}]}
            onPress={handleAddSong}>
            <Box mr={1}>
              <AddIcon
                width={responsiveSize(16)}
                height={responsiveSize(16)}
                color={theme.primary}
              />
            </Box>
            <Typography variant="b5" color={theme.text.primary}>
              Add song
            </Typography>
          </TouchableOpacity>
        </Box>
      );
    }

    return (
      <>
        <Box center>
          <TouchableOpacity style={styles.playAll__btn} onPress={handlePlayAll}>
            <Box mr={1}>
              <PlayIcon color={colors.codGray} />
            </Box>
            <Typography color={colors.codGray} variant="h6" fontWeight="600">
              Play all
            </Typography>
          </TouchableOpacity>
        </Box>

        <Box mt={3.5}>
          <TouchableOpacity onPress={handleAddSong}>
            <Box row flex={1} center mb={2}>
              <Box style={styles.song__thumbnail}>
                <AddIcon color={colors.white} />
              </Box>
              <Box flex={1} ml={2}>
                <Typography color={theme.text.primary}>Add song</Typography>
              </Box>
            </Box>
          </TouchableOpacity>

          {selectedPlaylist.songs.map(item => (
            <Box mb={2} key={item.id}>
              <SongListItem
                song={item}
                onMenuPress={() => setSelectedSong(item)}
              />
            </Box>
          ))}
        </Box>
      </>
    );
  };

  const menu = useMemo(() => {
    if (selectedPlaylist.id === FAVORITE_PLAYLIST_ID) {
      return [
        {
          icon: <AddCircleIcon color={theme.primary} />,
          title: 'Add song',
          onPress: () => {
            togglePlaylistMenu();
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

          if (images.length) {
            editPlaylistImage(selectedPlaylist.id, images[0]);
          }

          togglePlaylistMenu();
        },
      },
      {
        icon: <EditFillIcon color={theme.primary} />,
        title: 'Rename playlist',
        onPress: () => {
          // fix open modal on ios
          setTimeout(() => {
            toggleChangeNameModal();
          }, 500);
          togglePlaylistMenu();
        },
      },
      {
        icon: <AddCircleIcon color={theme.primary} />,
        title: 'Add song',
        onPress: () => {
          togglePlaylistMenu();
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
          togglePlaylistMenu();
          navigation.goBack();
          removePlaylist(selectedPlaylist.id);
        },
      },
    ];
  }, [
    editPlaylistImage,
    navigation,
    removePlaylist,
    theme.primary,
    selectedPlaylist.id,
  ]);

  const songMenu = [
    {
      icon: <AddCircleIcon color={theme.primary} />,
      title: 'Add to another playlist',
      onPress: () => {
        // TODO
      },
    },
    {
      icon: <ShareIcon color={theme.primary} />,
      title: 'Share song',
      onPress: () => {
        Share.share({
          message: `Check out this song on our site: ${
            selectedSong?.shareurl || ''
          }`,
        });
      },
    },
    {
      icon: <DeleteIcon color={theme.primary} />,
      title: 'Remove from playlist',
      onPress: () => {
        if (selectedSong?.id) {
          removeSongFromPlaylist(selectedPlaylist.id, selectedSong.id);
          setSelectedSong(undefined);
        }
      },
    },
  ];

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background.default}]}>
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

          <TouchableOpacity
            hitSlop={{top: 5, left: 10, bottom: 5, right: 10}}
            onPress={togglePlaylistMenu}>
            <MenuIcon color={theme.primary} />
          </TouchableOpacity>
        </Box>
      </Box>

      <Box center mb={3.5}>
        <Box style={styles.thumbnail__container}>
          {selectedPlaylist.urlthumb ? (
            <FastImage
              source={{
                uri: selectedPlaylist.urlthumb,
              }}
              style={styles.thumbnail__container}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <MusicIcon
              width={responsiveSize(75)}
              height={responsiveSize(95)}
              color={colors.caribbeanGreen}
            />
          )}
        </Box>
      </Box>

      {content()}

      <MenuContext
        open={openPlaylistMenu}
        menuOptions={menu}
        onClose={togglePlaylistMenu}
      />

      <AddPlaylistModal
        open={openChangeNameModal}
        onClose={toggleChangeNameModal}
        playlistId={selectedPlaylist.id}
        playlistName={selectedPlaylist.name}
      />

      <MenuContext
        open={Boolean(selectedSong)}
        menuOptions={songMenu}
        onClose={() => setSelectedSong(undefined)}
      />
    </ScrollView>
  );
};

export default withPlayerBar(MyPlaylist);
