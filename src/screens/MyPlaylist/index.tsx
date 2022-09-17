import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {SongListItem, withPlayerBar} from '@plx_tuber/components/shared';
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

  const selectedPlaylist = myPlaylists.find(
    playlist => playlist.id === myPlaylistId,
  ) || {
    id: FAVORITE_PLAYLIST_ID,
    name: 'Favorite',
    songs: favorite,
  };

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
              <SongListItem song={item} />
            </Box>
          ))}
        </Box>
      </>
    );
  };

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

          <TouchableOpacity>
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
    </ScrollView>
  );
};

export default withPlayerBar(MyPlaylist);
