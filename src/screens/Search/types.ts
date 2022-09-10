import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.Search
>;

export type SearchNavigationProps = SearchScreenProps['navigation'];
