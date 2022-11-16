import React from 'react';

import {Box, Typography} from '@plx_tuber/components';
import {SongListItem, withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {ArtistScreenProps} from './types';
import FastImage from 'react-native-fast-image';
import UserIcon from '@plx_tuber/assets/icons/User.icon';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SLEEPTIME} from '@plx_tuber/core/constants';
import {useQuery} from '@tanstack/react-query';
import {getArtistDetail} from '@plx_tuber/core/apis';

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

const Artist: React.FC<ArtistScreenProps> = ({navigation, route}) => {
  const theme = useThemeStore(state => state.theme);

  const artist = route.params.artist;

  const {data, isLoading} = useQuery(['artist', artist.nameArtist], () =>
    getArtistDetail(artist.nameArtist),
  );

  const insets = useSafeAreaInsets();

  const handlePressBack = () => navigation.goBack();

  const handlePlayAll = async () => {
    try {
      await TrackPlayer.reset();

      await TrackPlayer.add(
        (data || [])
          .filter(item => Boolean(item.audio))
          .map(item => ({
            ...item,
            url: item.audio,
            title: item.name,
            artist: item.artistName,
            artwork: item.image,
          })),
      );

      await AsyncStorage.removeItem(SLEEPTIME); // remove sleeptime when press play again
      await TrackPlayer.play();
    } catch (error) {
      // TODO
    }
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
              {artist.nameArtist}
            </Typography>
          </Box>
        </Box>

        <Box center mb={3.5} mt={2}>
          <Box style={styles.thumbnail__container}>
            {artist.avatar ? (
              <FastImage
                source={{
                  uri: artist.avatar,
                }}
                style={styles.thumbnail__container}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <UserIcon
                width={responsiveSize(75)}
                height={responsiveSize(95)}
                color={colors.caribbeanGreen}
              />
            )}
          </Box>
        </Box>

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
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            (data || []).map(item => (
              <Box mb={2} key={item.id}>
                <SongListItem song={item} onMenuPress={() => {}} />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default withPlayerBar(Artist);
