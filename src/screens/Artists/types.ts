import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  DiscoverStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type ArtistsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<DiscoverStackParamList, NavigatorMap.Discover>,
  BottomTabScreenProps<RootTabParamList, NavigatorMap.DiscoverTab>
>;

export type ArtistsNavigationProps = ArtistsScreenProps['navigation'];
