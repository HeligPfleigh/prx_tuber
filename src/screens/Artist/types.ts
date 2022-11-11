import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  DiscoverStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type ArtistScreenProps = CompositeScreenProps<
  NativeStackScreenProps<DiscoverStackParamList, NavigatorMap.Artist>,
  BottomTabScreenProps<RootTabParamList, NavigatorMap.DiscoverTab>
>;

export type ArtistNavigationProps = ArtistScreenProps['navigation'];
