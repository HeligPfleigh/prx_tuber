import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  HomeStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type SongsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, NavigatorMap.Songs>,
  BottomTabScreenProps<RootTabParamList, NavigatorMap.HomeTab>
>;

export type SongsNavigationProps = SongsScreenProps['navigation'];
