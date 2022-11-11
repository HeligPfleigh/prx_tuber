import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  FavoriteAndPlaylistStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type MyPlaylistScreenProps = CompositeScreenProps<
  NativeStackScreenProps<
    FavoriteAndPlaylistStackParamList,
    NavigatorMap.MyPlaylist
  >,
  BottomTabScreenProps<RootTabParamList, NavigatorMap.FavoriteAndPlaylistTab>
>;

export type MyPlaylistNavigationProps = MyPlaylistScreenProps['navigation'];
