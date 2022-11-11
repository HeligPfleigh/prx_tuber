import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  HomeStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type SearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, NavigatorMap.HomeTab>,
  NativeStackScreenProps<HomeStackParamList, NavigatorMap.Search>
>;

export type SearchNavigationProps = SearchScreenProps['navigation'];
