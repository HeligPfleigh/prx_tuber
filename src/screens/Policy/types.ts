import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  SettingStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type PolicyScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SettingStackParamList, NavigatorMap.Policy>,
  BottomTabScreenProps<RootTabParamList, NavigatorMap.SettingTab>
>;

export type PolicyNavigationProps = PolicyScreenProps['navigation'];
