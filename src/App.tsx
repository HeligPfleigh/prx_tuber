import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import React, {useEffect} from 'react';
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
// import TrackPlayer from 'react-native-track-player';

import AppNavigator from './navigations/AppNavigation';
// import {SetupService} from './services';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
      });
    });
  }, []);

  // useEffect(() => {
  //   async function run() {
  //     const isSetup = await SetupService();

  //     if (isSetup) {
  //       const track = {
  //         url: 'https://prod-1.storage.jamendo.com/?trackid=644676&format=mp31&from=ysksPQZIjs9MKgkVzS0TAw%3D%3D%7CacLeEldAbNkaRLAXZHTG5Q%3D%3D', // Load media from the network
  //       };
  //       await TrackPlayer.add([track]);
  //       TrackPlayer.play();
  //     }
  //   }

  //   run();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
