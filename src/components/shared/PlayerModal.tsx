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

interface IPlayerModalProps {
  open: boolean;
  title: string;
  artist: string;
  thumbnail: string;
  onClose: () => void;
}

const styles = StyleSheet.create({
  root: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    backgroundColor: colors.mineShaft,
    alignItems: 'center',
    minHeight: '50%',
    borderTopLeftRadius: responsiveSize(20),
    borderTopRightRadius: responsiveSize(20),
    padding: spacing(1.5),
  },
  indicator: {
    height: responsiveSize(5),
    width: responsiveSize(32),
    backgroundColor: colors.white,
    borderRadius: responsiveSize(2.5),
    marginBottom: spacing(3.5),
  },
  icon__btn: {
    ...round(36),
    backgroundColor: colors.white,
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
}) => {
  return (
    <Modal
      isVisible={open}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={styles.root}
      onBackdropPress={onClose}>
      <Box flex={false} style={styles.container}>
        <Box style={styles.indicator} />

        <Box row flex={1} center style={styles.full__width} space="around">
          <TouchableOpacity style={styles.icon__btn}>
            <HeartFillIcon color={colors.mineShaft} width={34} height={38} />
          </TouchableOpacity>

          <FastImage
            source={{
              uri: thumbnail,
            }}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />

          <TouchableOpacity style={styles.icon__btn}>
            <Box flex={1} center middle>
              <ReplyIcon color={colors.mineShaft} />
            </Box>
          </TouchableOpacity>
        </Box>

        <Typography variant="h6" color={colors.white}>
          {title}
        </Typography>
        <Typography variant="caps3" color={colors.gray100}>
          {artist}
        </Typography>

        <TouchableOpacity>
          <Box
            p={2}
            color="rgba(255, 255, 255, 0.14)"
            style={[styles.action__btn, styles.full__width]}
            row
            center
            mt={2}>
            <Box mr={2}>
              <PlayIcon color={colors.white} />
            </Box>
            <Box flex={1}>
              <Typography variant="b5" color={colors.white}>
                Play
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity>
          <Box
            p={2}
            color="rgba(255, 255, 255, 0.14)"
            style={[styles.action__btn, styles.full__width]}
            row
            center
            mt={2}>
            <Box mr={2}>
              <AddCircleIcon color={colors.white} />
            </Box>
            <Box flex={1}>
              <Typography variant="b5" color={colors.white}>
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
