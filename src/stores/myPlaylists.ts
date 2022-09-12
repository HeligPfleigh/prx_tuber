import create from 'zustand';
import produce from 'immer';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ISong} from '@plx_tuber/core/types';

interface MyPlaylistsState {
  favorite: Array<ISong>;
  addToFavorite: (song: ISong) => void;
}

export const useMyPlaylistsStore = create<MyPlaylistsState>()(
  persist(
    set => ({
      favorite: [] as Array<ISong>,

      addToFavorite: (song: ISong) =>
        set(
          produce(state => {
            if (state.favorite.some((item: ISong) => item.id === song.id)) {
              state.favorite = state.favorite.filter(
                (item: ISong) => item.id !== song.id,
              );
            } else {
              state.favorite.push(song);
            }
          }),
        ),
    }),
    {
      name: 'my-playlists-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
