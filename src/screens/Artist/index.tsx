import React from 'react';

import {Box, Typography} from '@plx_tuber/components';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {ArtistScreenProps} from './types';
import FastImage from 'react-native-fast-image';
import UserIcon from '@plx_tuber/assets/icons/User.icon';

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

  const insets = useSafeAreaInsets();

  const handlePressBack = () => navigation.goBack();

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
      </Box>
    </ScrollView>
  );
};

export default withPlayerBar(Artist);
