import {NativeStackScreenProps} from '@react-navigation/native-stack';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {RootStackParamList} from '@plx_tuber/navigations/types';

export type PolicyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigatorMap.Policy
>;

export type PolicyNavigationProps = PolicyScreenProps['navigation'];
