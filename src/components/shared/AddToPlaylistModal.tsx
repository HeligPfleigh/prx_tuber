import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {useThemeStore} from '@plx_tuber/stores/theme';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import {Box, Typography} from '../common';
import AddIcon from '@plx_tuber/assets/icons/Add.icon';
import MusicIcon from '@plx_tuber/assets/icons/Music.icon';
import {ISong} from '@plx_tuber/core/types';
import {AddPlaylistModal} from './AddPlaylistModal';

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

interface IAddToPlaylistModalProps {
  open: boolean;
  song?: ISong;
  onClose: () => void;
}

export const AddToPlaylistModal: React.FC<IAddToPlaylistModalProps> = ({
  open,
  song,
  onClose,
}) => {
  const theme = useThemeStore(state => state.theme);
  const myPlaylists = useMyPlaylistsStore(state => state.myPlaylists);
  const addSongToPlaylist = useMyPlaylistsStore(
    state => state.addSongToPlaylist,
  );

  const [openAddPlaylist, setOpenAddPlaylist] = useState<boolean>(false);
  const toggleAddPlaylist = () => setOpenAddPlaylist(prev => !prev);

  const handleAddSongToPlaylist = (id: number) => () => {
    if (song) {
      addSongToPlaylist(id, song);
    }
    onClose();
  };

  const handleCloseAddPlaylistModal = () => {
    toggleAddPlaylist();
    onClose();
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

        <TouchableOpacity onPress={toggleAddPlaylist}>
          <Box row center mt={2}>
            <Box style={styles.song__thumbnail}>
              <AddIcon color={colors.white} />
            </Box>
            <Box flex={1} ml={2}>
              <Typography variant="b5" color={theme.text.primary}>
                Create new playlist
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>

        {myPlaylists.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={handleAddSongToPlaylist(item.id)}>
            <Box row center mt={2}>
              <Box
                style={[
                  styles.song__thumbnail,
                  {backgroundColor: colors.tundora},
                ]}>
                <MusicIcon color={colors.caribbeanGreen} />
              </Box>
              <Box flex={1} ml={2}>
                <Typography variant="b5" color={theme.text.primary}>
                  {item.name}
                </Typography>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>

      <AddPlaylistModal
        open={openAddPlaylist}
        onClose={handleCloseAddPlaylistModal}
        song={song}
      />
    </Modal>
  );
};
