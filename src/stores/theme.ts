import create from 'zustand';
import produce from 'immer';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {colors} from '@plx_tuber/theme';

interface ITheme {
  key: 'light' | 'dark';
  background: {
    default: string;
    settingItem: string;
    seeAll: string;
    back: string;
    modal: string;
  };
  primary: string;
  text: {
    primary: string;
  };
}

const lightTheme: ITheme = {
  key: 'light' as const,
  background: {
    default: colors.white,
    settingItem: 'rgba(0, 0, 0, 0.14)',
    seeAll: 'rgba(0, 0, 0, 0.2)',
    back: 'rgba(0, 0, 0, 0.5)',
    modal: '#DDDDDD',
  },
  primary: colors.codGray,
  text: {primary: colors.codGray},
};

const darkTheme: ITheme = {
  key: 'dark' as const,
  background: {
    default: colors.codGray,
    settingItem: 'rgba(255, 255, 255, 0.14)',
    seeAll: 'rgba(255, 255, 255, 0.2)',
    back: 'rgba(255, 255, 255, 0.5)',
    modal: colors.mineShaft,
  },
  primary: colors.white,
  text: {primary: colors.white},
};

interface ThemeState {
  theme: ITheme;
  toggleDarkLightTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: darkTheme,

      toggleDarkLightTheme: () =>
        set(
          produce(state => {
            state.theme = state.theme.key === 'light' ? darkTheme : lightTheme;
          }),
        ),
    }),
    {
      name: 'theme-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
