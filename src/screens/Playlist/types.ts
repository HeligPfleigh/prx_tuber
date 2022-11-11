import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  HomeStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type PlaylistScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, NavigatorMap.Playlist>,
  BottomTabScreenProps<RootTabParamList, NavigatorMap.HomeTab>
>;

export type PlaylistNavigationProps = PlaylistScreenProps['navigation'];
