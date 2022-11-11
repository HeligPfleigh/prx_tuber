import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import analytics from '@react-native-firebase/analytics';

import NavigatorMap from './NavigatorMap';
import {
  RootTabParamList,
  HomeStackParamList,
  DiscoverStackParamList,
  FavoriteAndPlaylistStackParamList,
  SettingStackParamList,
} from './types';
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
import ArtistScreen from '@plx_tuber/screens/Artist';

const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const DiscoverStack = createNativeStackNavigator<DiscoverStackParamList>();
const FavoriteAndPlaylistStack =
  createNativeStackNavigator<FavoriteAndPlaylistStackParamList>();
const SettingStack = createNativeStackNavigator<SettingStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Screen name={NavigatorMap.Home} component={HomeScreen} />

    <HomeStack.Screen
      name={NavigatorMap.Playlists}
      component={PlaylistsScreen}
    />

    <HomeStack.Screen name={NavigatorMap.Playlist} component={PlaylistScreen} />

    <HomeStack.Screen name={NavigatorMap.Search} component={SearchScreen} />

    <HomeStack.Screen name={NavigatorMap.Songs} component={SongsScreen} />

    <HomeStack.Group screenOptions={{presentation: 'fullScreenModal'}}>
      <HomeStack.Screen name={NavigatorMap.Player} component={PlayerScreen} />
    </HomeStack.Group>
  </HomeStack.Navigator>
);

const DiscoverStackNavigator = () => (
  <DiscoverStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <DiscoverStack.Screen
      name={NavigatorMap.Discover}
      component={ArtistsScreen}
    />

    <DiscoverStack.Screen name={NavigatorMap.Artist} component={ArtistScreen} />

    <DiscoverStack.Group screenOptions={{presentation: 'fullScreenModal'}}>
      <DiscoverStack.Screen
        name={NavigatorMap.Player}
        component={PlayerScreen}
      />
    </DiscoverStack.Group>
  </DiscoverStack.Navigator>
);

const FavoriteAndPlaylistStackNavigator = () => (
  <FavoriteAndPlaylistStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <FavoriteAndPlaylistStack.Screen
      name={NavigatorMap.FavoriteAndPlaylist}
      component={MyPlaylistsScreen}
    />

    <FavoriteAndPlaylistStack.Screen
      name={NavigatorMap.MyPlaylist}
      component={MyPlaylistScreen}
    />

    <FavoriteAndPlaylistStack.Screen
      name={NavigatorMap.Search}
      component={SearchScreen}
    />

    <FavoriteAndPlaylistStack.Group
      screenOptions={{presentation: 'fullScreenModal'}}>
      <FavoriteAndPlaylistStack.Screen
        name={NavigatorMap.Player}
        component={PlayerScreen}
      />
    </FavoriteAndPlaylistStack.Group>
  </FavoriteAndPlaylistStack.Navigator>
);

const SettingStackNavigator = () => (
  <SettingStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <SettingStack.Screen
      name={NavigatorMap.Setting}
      component={SettingsScreen}
    />

    <SettingStack.Screen name={NavigatorMap.Policy} component={PolicyScreen} />

    <SettingStack.Group screenOptions={{presentation: 'fullScreenModal'}}>
      <SettingStack.Screen
        name={NavigatorMap.Player}
        component={PlayerScreen}
      />
    </SettingStack.Group>
  </SettingStack.Navigator>
);

const RootTabNavigator = () => (
  <Tab.Navigator
    tabBar={props => <PlxTuberTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name={NavigatorMap.HomeTab} component={HomeStackNavigator} />

    <Tab.Screen
      name={NavigatorMap.DiscoverTab}
      component={DiscoverStackNavigator}
    />

    <Tab.Screen
      name={NavigatorMap.FavoriteAndPlaylistTab}
      component={FavoriteAndPlaylistStackNavigator}
    />

    <Tab.Screen
      name={NavigatorMap.SettingTab}
      component={SettingStackNavigator}
    />
  </Tab.Navigator>
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
      <RootTabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
