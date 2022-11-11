import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {
  SettingStackParamList,
  RootTabParamList,
} from '@plx_tuber/navigations/types';

export type SettingScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SettingStackParamList, NavigatorMap.Setting>,
  BottomTabScreenProps<RootTabParamList, NavigatorMap.SettingTab>
>;

export type SettingNavigationProps = SettingScreenProps['navigation'];
