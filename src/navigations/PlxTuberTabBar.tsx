import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import NavigatorMap from './NavigatorMap';
import HomeIcon from '@plx_tuber/assets/icons/Home.icon';
import DiscoverIcon from '@plx_tuber/assets/icons/Discover.icon';
import HeartIcon from '@plx_tuber/assets/icons/Heart.icon';
import CogIcon from '@plx_tuber/assets/icons/Cog.icon';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import HomeFillIcon from '@plx_tuber/assets/icons/HomeFill.icon';
import DiscoverFillIcon from '@plx_tuber/assets/icons/DiscoverFill.icon';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import CogFillIcon from '@plx_tuber/assets/icons/CogFill.icon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    backgroundColor: colors.codGray,
    paddingVertical: responsiveSize(16),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIndicator: {
    width: responsiveSize(3),
    height: responsiveSize(3),
    marginTop: spacing(1),
  },
});

const Icons = {
  [NavigatorMap.HomeTab]: <HomeIcon color={colors.scorpion} />,
  [NavigatorMap.DiscoverTab]: <DiscoverIcon color={colors.scorpion} />,
  [NavigatorMap.FavoriteAndPlaylistTab]: <HeartIcon color={colors.scorpion} />,
  [NavigatorMap.SettingTab]: <CogIcon color={colors.scorpion} />,
};

const SelectedIcons = {
  [NavigatorMap.HomeTab]: <HomeFillIcon color={colors.white} />,
  [NavigatorMap.DiscoverTab]: <DiscoverFillIcon color={colors.white} />,
  [NavigatorMap.FavoriteAndPlaylistTab]: <HeartFillIcon color={colors.white} />,
  [NavigatorMap.SettingTab]: <CogFillIcon color={colors.white} />,
};

const PlxTuberTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              merge: true,
              params: undefined,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            key={route.key}>
            {isFocused
              ? SelectedIcons[route.name as NavigatorMap]
              : Icons[route.name as NavigatorMap]}
            <View
              style={[
                styles.tabIndicator,
                {backgroundColor: isFocused ? colors.java : colors.codGray},
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PlxTuberTabBar;