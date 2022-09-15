import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type MyPlaylistScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.MyPlaylist
>;

export type MyPlaylistNavigationProps = MyPlaylistScreenProps['navigation'];
