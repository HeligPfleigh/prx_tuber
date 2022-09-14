import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity, Share} from 'react-native';

import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {Box, Typography} from '../common';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import AddCircleIcon from '@plx_tuber/assets/icons/AddCircle.icon';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import ReplyIcon from '@plx_tuber/assets/icons/Reply.icon';
import FastImage from 'react-native-fast-image';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {ISong} from '@plx_tuber/core/types';
import TrackPlayer from 'react-native-track-player';
import {useToast} from 'react-native-toast-notifications';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';

interface IPlayerModalProps {
  open: boolean;
  song?: ISong;
  onClose?: () => void;
  onAddToPlaylist?: () => void;
}

const styles = StyleSheet.create({
  root: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    minHeight: responsiveSize(400),
    borderTopLeftRadius: responsiveSize(20),
    borderTopRightRadius: responsiveSize(20),
    padding: spacing(1.5),
  },
  indicator: {
    height: responsiveSize(5),
    width: responsiveSize(32),
    borderRadius: responsiveSize(2.5),
    marginBottom: spacing(3.5),
  },
  icon__btn: {
    ...round(36),
  },
  full__width: {
    width: '100%',
  },
  action__btn: {
    borderRadius: responsiveSize(9),
  },
  thumbnail: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    borderRadius: responsiveSize(5),
  },
});

export const PlayerModal: React.FC<IPlayerModalProps> = ({
  open,
  song,
  onClose,
  onAddToPlaylist,
}) => {
  const theme = useThemeStore(state => state.theme);

  const favorite = useMyPlaylistsStore(state => state.favorite);

  const addToFavorite = useMyPlaylistsStore(state => state.addToFavorite);

  const toast = useToast();

  const handlePlay = async () => {
    try {
      if (!song || !song.audio) {
        throw new Error('Cannot load track!');
      }

      await TrackPlayer.reset();

      await TrackPlayer.add({
        url: song.audio,
        title: song.name,
        artist: song.artistName,
        artwork: song.image,
      });

      await TrackPlayer.play();
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, {
          type: 'danger',
        });
      }
    } finally {
      onClose?.();
    }
  };

  const handleAddToFavorite = () => {
    if (song) {
      addToFavorite(song);
    }
  };

  const handleShare = () => {
    Share.share({
      message: `Check out this song on our site: ${song?.shareurl || ''}`,
    });
  };

  return (
    <Modal
      isVisible={open}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={styles.root}
      onBackdropPress={onClose}>
      <Box
        style={[styles.container, {backgroundColor: theme.background.modal}]}>
        <Box
          style={[
            styles.indicator,
            {
              backgroundColor: theme.primary,
            },
          ]}
        />

        <Box row flex={1} center style={styles.full__width} space="around">
          <TouchableOpacity
            style={[styles.icon__btn, {backgroundColor: theme.primary}]}
            onPress={handleAddToFavorite}>
            <Box flex={1} center middle>
              <HeartFillIcon
                color={
                  favorite.some(item => item.id === song?.id)
                    ? colors.sunsetOrange
                    : theme.background.modal
                }
              />
            </Box>
          </TouchableOpacity>

          <FastImage
            source={{
              uri: song?.image || '',
            }}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />

          <TouchableOpacity
            style={[styles.icon__btn, {backgroundColor: theme.primary}]}
            onPress={handleShare}>
            <Box flex={1} center middle>
              <ReplyIcon color={theme.background.modal} />
            </Box>
          </TouchableOpacity>
        </Box>

        <Typography variant="h6" color={theme.text.primary}>
          {song?.name || ''}
        </Typography>
        <Typography variant="caps3" color={colors.gray100}>
          {song?.artistName || ''}
        </Typography>

        <TouchableOpacity onPress={handlePlay}>
          <Box
            p={2}
            style={[
              styles.action__btn,
              styles.full__width,
              {backgroundColor: theme.background.settingItem},
            ]}
            row
            center
            mt={2}>
            <Box mr={2}>
              <PlayIcon color={theme.primary} />
            </Box>
            <Box flex={1}>
              <Typography variant="b5" color={theme.text.primary}>
                Play
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={onAddToPlaylist}>
          <Box
            p={2}
            style={[
              styles.action__btn,
              styles.full__width,
              {backgroundColor: theme.background.settingItem},
            ]}
            row
            center
            mt={2}>
            <Box mr={2}>
              <AddCircleIcon color={theme.primary} />
            </Box>
            <Box flex={1}>
              <Typography variant="b5" color={theme.text.primary}>
                Add to playlist
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Box mt={2} mb={2}>
            <Typography variant="b5" color={colors.sunsetOrange}>
              Cancel
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>
    </Modal>
  );
};
