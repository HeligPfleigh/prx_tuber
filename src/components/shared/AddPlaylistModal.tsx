import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import {Box, Typography} from '../common';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';

interface IAddPlaylistModalProps {
  open: boolean;
  playlistName?: string;
  playlistId?: number;
  onClose?: () => void;
}

const styles = StyleSheet.create({
  container: {
    minHeight: responsiveSize(200),
    padding: spacing(2),
    alignItems: 'center',
  },
  input: {
    color: colors.codGray,
    textAlignVertical: 'top',
    padding: spacing(1),
    borderRadius: responsiveSize(8),
    marginTop: spacing(5),
    textAlign: 'center',
  },
});

export const AddPlaylistModal: React.FC<IAddPlaylistModalProps> = ({
  open,
  playlistName,
  playlistId,
  onClose,
}) => {
  const theme = useThemeStore(state => state.theme);

  const createPlaylist = useMyPlaylistsStore(state => state.createPlaylist);
  const editPlaylistName = useMyPlaylistsStore(state => state.editPlaylistName);

  const [name, setName] = useState<string>();

  useEffect(() => {
    setName(playlistName);
  }, [playlistName]);

  const handleClose = () => {
    onClose?.();
    setName(undefined);
  };

  const handleSavePlaylist = () => {
    if (!name) {
      return;
    }

    // create new playlist
    if (!playlistName) {
      createPlaylist(name);
    } else {
      if (!playlistId) {
        return;
      }
      // edit name of existed playlist
      editPlaylistName(playlistId, name);
    }

    handleClose();
  };

  return (
    <Modal
      isVisible={open}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      onBackdropPress={handleClose}>
      <Box
        style={[styles.container, {backgroundColor: theme.background.modal}]}>
        <Typography variant="b5" fontWeight="700" color={theme.text.primary}>
          {playlistName ? 'Edit playlist name' : 'Create new playlist'}
        </Typography>

        <TextInput
          value={name}
          onChangeText={setName}
          style={[styles.input, {color: theme.text.primary}]}
          placeholder="Enter playlist name"
          placeholderTextColor={colors.silver}
          autoFocus
          multiline={true}
          numberOfLines={1}
        />

        <Box row mt={5}>
          <TouchableOpacity onPress={handleSavePlaylist}>
            <Box mr={2}>
              <Typography variant="caps3" color={colors.caribbeanGreen}>
                Save
              </Typography>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose}>
            <Typography variant="caps3" color={colors.silver}>
              Cancel
            </Typography>
          </TouchableOpacity>
        </Box>
      </Box>
    </Modal>
  );
};
