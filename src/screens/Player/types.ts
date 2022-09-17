import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type PlayerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.Player
>;

export type PlayerNavigationProps = PlayerScreenProps['navigation'];
