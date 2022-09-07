import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type PlaylistsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.Playlists
>;

export type PlaylistsNavigationProps = PlaylistsScreenProps['navigation'];
