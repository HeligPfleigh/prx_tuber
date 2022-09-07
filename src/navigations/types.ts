import {IPlaylist} from '@plx_tuber/core/types';
import NavigatorMap from './NavigatorMap';

export type TabParamList = {
  [NavigatorMap.HomeTab]: undefined;
  [NavigatorMap.DiscoverTab]: undefined;
  [NavigatorMap.FavoriteAndPlaylistTab]: undefined;
  [NavigatorMap.SettingTab]: undefined;
};

export type RootStackParamList = {
  [NavigatorMap.MainTab]: undefined;
  [NavigatorMap.Playlist]: {
    playlist: IPlaylist;
  };
};
