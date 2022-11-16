import {IArtist, IPlaylist, ISong} from '@plx_tuber/core/types';
import NavigatorMap from './NavigatorMap';

export type RootTabParamList = {
  [NavigatorMap.HomeTab]: undefined;
  [NavigatorMap.DiscoverTab]: undefined;
  [NavigatorMap.FavoriteAndPlaylistTab]: undefined;
  [NavigatorMap.SettingTab]: undefined;
};

export type HomeStackParamList = {
  [NavigatorMap.Home]: undefined;
  [NavigatorMap.Playlist]: {
    playlist: IPlaylist;
  };
  [NavigatorMap.Playlists]: {
    title: string;
    playlists: Array<IPlaylist>;
  };
  [NavigatorMap.Search]: undefined;
  [NavigatorMap.Songs]: {
    title: string;
    songs: Array<ISong>;
  };
  [NavigatorMap.Player]: undefined;
};

export type DiscoverStackParamList = {
  [NavigatorMap.Discover]: undefined;
  [NavigatorMap.Artist]: {
    artist: IArtist;
  };
  [NavigatorMap.Search]: undefined;
  [NavigatorMap.Player]: undefined;
};

export type FavoriteAndPlaylistStackParamList = {
  [NavigatorMap.FavoriteAndPlaylist]: undefined;
  [NavigatorMap.MyPlaylist]: {
    id: number;
  };
  [NavigatorMap.Search]: undefined;
  [NavigatorMap.Player]: undefined;
};

export type SettingStackParamList = {
  [NavigatorMap.Setting]: undefined;
  [NavigatorMap.Policy]: undefined;
  [NavigatorMap.Player]: undefined;
};
