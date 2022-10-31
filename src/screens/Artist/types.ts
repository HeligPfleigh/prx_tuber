import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type ArtistScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.Artist
>;

export type ArtistNavigationProps = ArtistScreenProps['navigation'];
