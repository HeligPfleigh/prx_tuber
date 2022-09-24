import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import analytics from '@react-native-firebase/analytics';

import NavigatorMap from './NavigatorMap';
import {TabParamList, RootStackParamList} from './types';
import PlxTuberTabBar from './PlxTuberTabBar';
import HomeScreen from '@plx_tuber/screens/Home';
import ArtistsScreen from '@plx_tuber/screens/Artists';
import PlaylistScreen from '@plx_tuber/screens/Playlist';
import SongsScreen from '@plx_tuber/screens/Songs';
import PlaylistsScreen from '@plx_tuber/screens/Playlists';
import SearchScreen from '@plx_tuber/screens/Search';
import SettingsScreen from '@plx_tuber/screens/Settings';
import MyPlaylistsScreen from '@plx_tuber/screens/MyPlaylists';
import PolicyScreen from '@plx_tuber/screens/Policy';
import MyPlaylistScreen from '@plx_tuber/screens/MyPlaylist';
import PlayerScreen from '@plx_tuber/screens/Player';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={props => <PlxTuberTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name={NavigatorMap.HomeTab} component={HomeScreen} />
    <Tab.Screen name={NavigatorMap.DiscoverTab} component={ArtistsScreen} />
    <Tab.Screen
      name={NavigatorMap.FavoriteAndPlaylistTab}
      component={MyPlaylistsScreen}
    />
    <Tab.Screen name={NavigatorMap.SettingTab} component={SettingsScreen} />
  </Tab.Navigator>
);

const RootStackNavigator = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name={NavigatorMap.MainTab} component={TabNavigator} />
    <RootStack.Screen name={NavigatorMap.Playlist} component={PlaylistScreen} />
    <RootStack.Screen name={NavigatorMap.Songs} component={SongsScreen} />
    <RootStack.Screen
      name={NavigatorMap.Playlists}
      component={PlaylistsScreen}
    />
    <RootStack.Screen name={NavigatorMap.Policy} component={PolicyScreen} />
    <RootStack.Screen
      name={NavigatorMap.MyPlaylist}
      component={MyPlaylistScreen}
    />
    <RootStack.Screen name={NavigatorMap.Search} component={SearchScreen} />
    <RootStack.Group screenOptions={{presentation: 'fullScreenModal'}}>
      <RootStack.Screen name={NavigatorMap.Player} component={PlayerScreen} />
    </RootStack.Group>
  </RootStack.Navigator>
);

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
    const currentRouteParams = navigationRef.getCurrentRoute()?.params ?? {};

    if (!currentRouteName) {
      return;
    }

    if (previousRouteName !== currentRouteName) {
      try {
        // firebase analytics
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
          ...currentRouteParams,
        });
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
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
