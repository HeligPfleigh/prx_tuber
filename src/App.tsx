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
import {SetupService} from './services';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
      });
    });
  }, []);

  useEffect(() => {
    async function setup() {
      await SetupService();
    }

    setup();
  }, []);

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
