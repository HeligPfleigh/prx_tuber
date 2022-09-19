import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {useThemeStore} from '@plx_tuber/stores/theme';
import {useMyPlaylistsStore} from '@plx_tuber/stores/myPlaylists';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import {Box, Typography} from '../common';
import AddIcon from '@plx_tuber/assets/icons/Add.icon';
import MusicIcon from '@plx_tuber/assets/icons/Music.icon';

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
  onClose: () => void;
}

export const AddToPlaylistModal: React.FC<IAddToPlaylistModalProps> = ({
  open,
  onClose,
}) => {
  const theme = useThemeStore(state => state.theme);
  const myPlaylists = useMyPlaylistsStore(state => state.myPlaylists);

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

        <TouchableOpacity>
          <Box row center mt={2}>
            <Box style={styles.song__thumbnail}>
              <AddIcon color={colors.white} />
            </Box>
            <Box flex={1} ml={2}>
              <Typography color={theme.text.primary}>
                Create new playlist
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>

        {myPlaylists.map(item => (
          <TouchableOpacity key={item.id}>
            <Box row center mt={2}>
              <Box
                style={[
                  styles.song__thumbnail,
                  {backgroundColor: colors.tundora},
                ]}>
                <MusicIcon color={colors.caribbeanGreen} />
              </Box>
              <Box flex={1} ml={2}>
                <Typography color={theme.text.primary}>{item.name}</Typography>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}

        {/* {menuOptions.map(item => (
        <TouchableOpacity key={item.title} onPress={item.onPress}>
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
            <Box mr={2}>{item.icon}</Box>
            <Box flex={1}>
              <Typography variant="b5" color={theme.text.primary}>
                {item.title}
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>
      ))} */}
      </Box>
    </Modal>
  );
};
