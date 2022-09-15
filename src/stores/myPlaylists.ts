import create from 'zustand';
import produce from 'immer';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ISong} from '@plx_tuber/core/types';

interface IMyPlaylist {
  id: number;
  name: string;
  urlthumb?: string;
  songs: Array<ISong>;
}

interface MyPlaylistsState {
  favorite: Array<ISong>;
  myPlaylists: Array<IMyPlaylist>;
  addToFavorite: (song: ISong) => void;
  createPlaylist: (name: string) => void;
  removePlaylist: (playlistId: number) => void;
  editPlaylistName: (playlistId: number, name: string) => void;
  editPlaylistImage: (playlistId: number, image?: string) => void;
  addSongToPlaylist: (playlistId: number, song: ISong) => void;
  removeSongFromPlaylist: (playlistId: number, songId: number) => void;
}

export const useMyPlaylistsStore = create<MyPlaylistsState>()(
  persist(
    (set, get) => ({
      favorite: [] as Array<ISong>,

      myPlaylists: [] as Array<IMyPlaylist>,

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

      createPlaylist: (name: string) =>
        set(
          produce((state: MyPlaylistsState) => {
            state.myPlaylists.push({
              name,
              id: new Date().getTime(),
              songs: [] as Array<ISong>,
            });
          }),
        ),

      removePlaylist: (playlistId: number) =>
        set(
          produce((state: MyPlaylistsState) => {
            state.myPlaylists = state.myPlaylists.filter(
              (playlist: IMyPlaylist) => playlist.id !== playlistId,
            );
          }),
        ),

      editPlaylistName: (playlistId: number, name: string) =>
        set(
          produce((state: MyPlaylistsState) => {
            const selectedPlaylistIdx = state.myPlaylists.findIndex(
              (playlist: IMyPlaylist) => playlist.id === playlistId,
            );

            if (selectedPlaylistIdx !== -1) {
              state.myPlaylists[selectedPlaylistIdx].name = name;
            }
          }),
        ),

      editPlaylistImage: (playlistId: number, image?: string) =>
        set(
          produce((state: MyPlaylistsState) => {
            const selectedPlaylistIdx = state.myPlaylists.findIndex(
              (playlist: IMyPlaylist) => playlist.id === playlistId,
            );

            if (selectedPlaylistIdx !== -1) {
              state.myPlaylists[selectedPlaylistIdx].urlthumb = image;
            }
          }),
        ),

      addSongToPlaylist: (playlistId: number, song: ISong) =>
        set(
          produce((state: MyPlaylistsState) => {
            const selectedPlaylistIdx = state.myPlaylists.findIndex(
              (playlist: IMyPlaylist) => playlist.id === playlistId,
            );

            if (selectedPlaylistIdx !== -1) {
              state.myPlaylists[selectedPlaylistIdx].songs.push(song);
            }
          }),
        ),

      removeSongFromPlaylist: (playlistId: number, songId: number) =>
        set(
          produce((state: MyPlaylistsState) => {
            const selectedPlaylistIdx = state.myPlaylists.findIndex(
              (playlist: IMyPlaylist) => playlist.id === playlistId,
            );

            if (selectedPlaylistIdx !== -1) {
              state.myPlaylists[selectedPlaylistIdx].songs = state.myPlaylists[
                selectedPlaylistIdx
              ].songs.filter((song: ISong) => song.id !== songId);
            }
          }),
        ),

      getPlaylistById: (playlistId: number) =>
        get().myPlaylists.find(playlist => playlist.id === playlistId) || {
          id: 0,
          name: 'Favorite',
          songs: get().favorite,
        },
    }),
    {
      name: 'my-playlists-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
