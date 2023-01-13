import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';

import NavigatorMap from './NavigatorMap';
import HomeIcon from '@plx_tuber/assets/icons/Home.icon';
import DiscoverIcon from '@plx_tuber/assets/icons/Discover.icon';
import HeartIcon from '@plx_tuber/assets/icons/Heart.icon';
import CogIcon from '@plx_tuber/assets/icons/Cog.icon';
import {colors} from '@plx_tuber/theme';
import HomeFillIcon from '@plx_tuber/assets/icons/HomeFill.icon';
import DiscoverFillIcon from '@plx_tuber/assets/icons/DiscoverFill.icon';
import HeartFillIcon from '@plx_tuber/assets/icons/HeartFill.icon';
import CogFillIcon from '@plx_tuber/assets/icons/CogFill.icon';
import {useThemeStore} from '@plx_tuber/stores/theme';
import * as Animatable from 'react-native-animatable';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {adConfigs} from '@plx_tuber/components/ads/config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 50,
    // paddingVertical: responsiveSize(16),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: spacing(1.5),
  },
});

const Icons = {
  [NavigatorMap.HomeTab]: <HomeIcon color={colors.scorpion} />,
  [NavigatorMap.DiscoverTab]: <DiscoverIcon color={colors.scorpion} />,
  [NavigatorMap.FavoriteAndPlaylistTab]: <HeartIcon color={colors.scorpion} />,
  [NavigatorMap.SettingTab]: <CogIcon color={colors.scorpion} />,
};

const TabButton = (props: any) => {
  const {
    onPress,
    accessibilityState,
    onLongPress,
    routeName,
    tabBarAccessibilityLabel,
  } = props;

  const focused = accessibilityState.selected;

  const theme = useThemeStore(mState => mState.theme);

  const SelectedIcons = {
    [NavigatorMap.HomeTab]: <HomeFillIcon color={theme.text.primary} />,
    [NavigatorMap.DiscoverTab]: <DiscoverFillIcon color={theme.text.primary} />,
    [NavigatorMap.FavoriteAndPlaylistTab]: (
      <HeartFillIcon color={theme.text.primary} />
    ),
    [NavigatorMap.SettingTab]: <CogFillIcon color={theme.text.primary} />,
  };

  const viewRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.2, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.2, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={tabBarAccessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={1}
      style={[styles.tab, {backgroundColor: theme.background.default}]}>
      <Animatable.View ref={viewRef} duration={800}>
        {focused
          ? SelectedIcons[routeName as keyof typeof SelectedIcons]
          : Icons[routeName as keyof typeof SelectedIcons]}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const PlxTuberTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View>
      <BannerAd
        unitId={adConfigs.bannerAdUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

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
            <TabButton
              key={route.key}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              // testID={options.tabBarTestID}
              routeName={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PlxTuberTabBar;
