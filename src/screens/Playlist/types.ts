import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type PlaylistScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.Playlist
>;

export type PlaylistNavigationProps = PlaylistScreenProps['navigation'];
