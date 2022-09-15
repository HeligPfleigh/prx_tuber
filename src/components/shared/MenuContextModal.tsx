import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import {responsiveSize, spacing} from '@plx_tuber/theme';
import {Box, Typography} from '../common';
import {useThemeStore} from '@plx_tuber/stores/theme';

interface IMenuOption {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

interface IMenuContextProps {
  open: boolean;
  onClose?: () => void;
  menuOptions: Array<IMenuOption>;
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
  full__width: {
    width: '100%',
  },
  action__btn: {
    borderRadius: responsiveSize(9),
  },
});

export const MenuContext: React.FC<IMenuContextProps> = ({
  open,
  menuOptions,
  onClose,
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
        style={[styles.container, {backgroundColor: theme.background.modal}]}>
        <Box
          style={[
            styles.indicator,
            {
              backgroundColor: theme.primary,
            },
          ]}
        />

        {menuOptions.map(item => (
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
        ))}
      </Box>
    </Modal>
  );
};
