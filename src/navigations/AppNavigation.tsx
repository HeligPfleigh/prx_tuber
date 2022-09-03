import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {useRef} from 'react';

import NavigatorMap from './NavigatorMap';
import {RootTabParamList} from './types';
import PlxTuberTabBar from './PlxTuberTabBar';
import HomeScreen from '@plx_tuber/screens/Home';
import ArtistsScreen from '@plx_tuber/screens/Artists';
import Prototype from '@plx_tuber/screens/Prototype';

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>('');

  const onNavigationReady = () => {
    if (navigationRef.current) {
      routeNameRef.current =
        navigationRef.current.getCurrentRoute()?.name ?? '';
    }
  };

  const onStateChange = async () => {
    if (!navigationRef.current) {
      return;
    }

    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;
    // const currentRouteParams = navigationRef.getCurrentRoute()?.params ?? {};

    if (!currentRouteName) {
      return;
    }

    if (previousRouteName !== currentRouteName) {
      try {
        // firebase analytics
        // await analytics().logScreenView({
        //   screen_name: currentRouteName,
        //   screen_class: currentRouteName,
        //   ...currentRouteParams,
        // });
      } catch (error) {}
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onNavigationReady}
      onStateChange={onStateChange}>
      <Tab.Navigator
        tabBar={props => <PlxTuberTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name={NavigatorMap.HomeTab} component={HomeScreen} />
        <Tab.Screen name={NavigatorMap.DiscoverTab} component={ArtistsScreen} />
        <Tab.Screen
          name={NavigatorMap.FavoriteAndPlaylistTab}
          component={Prototype}
        />
        <Tab.Screen name={NavigatorMap.SettingTab} component={Prototype} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
