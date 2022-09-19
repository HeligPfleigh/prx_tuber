import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {useThemeStore} from '@plx_tuber/stores/theme';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import {Box, Typography} from '@plx_tuber/components';
import TrackPlayer, {Track} from 'react-native-track-player';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  root: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    borderTopLeftRadius: responsiveSize(20),
    borderTopRightRadius: responsiveSize(20),
    paddingTop: spacing(1.5),
    paddingHorizontal: spacing(2),
    paddingBottom: spacing(3),
    maxHeight: '70%',
  },
  indicator: {
    height: responsiveSize(5),
    width: responsiveSize(32),
    borderRadius: responsiveSize(2.5),
    marginBottom: spacing(3.5),
  },
  full__width: {
    width: '100%',
  },
  action__btn: {
    borderRadius: responsiveSize(9),
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

interface IPlaylistQueueModalProps {
  open: boolean;
  onClose: () => void;
}

export const PlaylistQueueModal: React.FC<IPlaylistQueueModalProps> = ({
  open,
  onClose,
}) => {
  const theme = useThemeStore(state => state.theme);
  const [queue, setQueue] = useState<Track[]>([]);

  useEffect(() => {
    const loadQueue = async () => {
      try {
        const mQueue = await TrackPlayer.getQueue();
        setQueue(mQueue);
      } catch (error) {}
    };

    if (open) {
      loadQueue();
    }
  }, [open]);

  const handlePlayTrack = (track: Track) => async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    const nextIndex = queue.findIndex(item => item.id === track.id);
    if (trackIndex !== nextIndex) {
      await TrackPlayer.skip(nextIndex);
    }
    onClose();
  };

  return (
    <Modal
      isVisible={open}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      propagateSwipe
      style={styles.root}
      onBackdropPress={onClose}>
      <Box
        style={[styles.container, {backgroundColor: theme.background.modal}]}>
        <Box center>
          <Box
            style={[
              styles.indicator,
              {
                backgroundColor: theme.primary,
              },
            ]}
          />
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Typography color={theme.text.primary} variant="b5" fontWeight="700">
            Playlist
          </Typography>

          {queue.map(track => (
            <TouchableOpacity key={track.id} onPress={handlePlayTrack(track)}>
              <Box row center mt={2}>
                <FastImage
                  source={{uri: String(track.artwork)}}
                  style={styles.song__thumbnail}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Box flex={1} ml={2}>
                  <Typography color={theme.text.primary}>
                    {track.title || ''}
                  </Typography>
                </Box>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
    </Modal>
  );
};
