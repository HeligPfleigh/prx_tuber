import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type SongsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.Songs
>;

export type SongsNavigationProps = SongsScreenProps['navigation'];
