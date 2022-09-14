import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList, TabParamList} from '@plx_tuber/navigations/types';

export type MyPlaylistsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, NavigatorMap.FavoriteAndPlaylistTab>,
  NativeStackScreenProps<RootStackParamList, NavigatorMap.MainTab>
>;

export type MyPlaylistsNavigationProps = MyPlaylistsScreenProps['navigation'];
