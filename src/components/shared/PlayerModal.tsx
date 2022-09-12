import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {Box, Typography} from '../common';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import AddCircleIcon from '@plx_tuber/assets/icons/AddCircle.icon';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import ReplyIcon from '@plx_tuber/assets/icons/Reply.icon';
import FastImage from 'react-native-fast-image';
import {useThemeStore} from '@plx_tuber/stores/theme';

interface IPlayerModalProps {
  open: boolean;
  title: string;
  artist: string;
  thumbnail: string;
  onClose?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
  onPlay?: () => void;
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
  title,
  artist,
  thumbnail,
  onClose,
  onFavorite,
  onShare,
  onPlay,
  onAddToPlaylist,
}) => {
  const theme = useThemeStore(state => state.theme);

  return (
    <Modal
      isVisible={open}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={styles.root}
      onBackdropPress={onClose}>
      <Box
        flex={false}
        style={[
          styles.container,
          {backgroundColor: theme.background.playerModal},
        ]}>
        <Box style={[styles.indicator, {backgroundColor: theme.primary}]} />

        <Box row flex={1} center style={styles.full__width} space="around">
          <TouchableOpacity
            style={[styles.icon__btn, {backgroundColor: theme.primary}]}
            onPress={onFavorite}>
            <Box flex={1} center middle>
              <HeartFillIcon color={theme.background.playerModal} />
            </Box>
          </TouchableOpacity>

          <FastImage
            source={{
              uri: thumbnail,
            }}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />

          <TouchableOpacity
            style={[styles.icon__btn, {backgroundColor: theme.primary}]}
            onPress={onShare}>
            <Box flex={1} center middle>
              <ReplyIcon color={theme.background.playerModal} />
            </Box>
          </TouchableOpacity>
        </Box>

        <Typography variant="h6" color={theme.text.primary}>
          {title}
        </Typography>
        <Typography variant="caps3" color={colors.gray100}>
          {artist}
        </Typography>

        <TouchableOpacity onPress={onPlay}>
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
