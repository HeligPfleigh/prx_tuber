/* eslint-disable no-console */
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
import mobileAds from 'react-native-google-mobile-ads';
import remoteConfig from '@react-native-firebase/remote-config';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './navigations/AppNavigation';
import {SetupService} from './services';
import {useAdsStore} from './stores/ads';
// import {useAdsStore} from '@plx_tuber/stores/ads';

const queryClient = new QueryClient();

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
    console.log({adapterStatuses});
  });

remoteConfig()
  .setDefaults({
    interstitial_ad_rate: 1,
    open_ad_rate: 1,
  })
  .then(() => remoteConfig().fetchAndActivate())
  .then(fetchedRemotely => {
    if (fetchedRemotely) {
      console.info('Configs were retrieved from the backend and activated.');
      AsyncStorage.setItem(
        Config.REMOTE_CONFIG_INTERSTITIAL_AD_RATE,
        remoteConfig()
          .getValue(Config.REMOTE_CONFIG_INTERSTITIAL_AD_RATE)
          .asString(),
      );

      AsyncStorage.setItem(
        Config.REMOTE_CONFIG_OPEN_AD_RATE,
        remoteConfig().getValue(Config.REMOTE_CONFIG_OPEN_AD_RATE).asString(),
      );
      // const adsStore = useAdsStore();
      // adsStore.setAdRate({
      // interstitialAdRate: remoteConfig()
      //   .getValue(Config.REMOTE_CONFIG_INTERSTITIAL_AD_RATE)
      //   .asNumber(),
      //   openAdRate: remoteConfig()
      //     .getValue(Config.REMOTE_CONFIG_OPEN_AD_RATE)
      //     .asNumber(),
      // });
    } else {
      console.info(
        'No configs were fetched from the backend, and the local configs were already activated',
      );
    }
  });

function App() {
  const adsStore = useAdsStore(state => state);

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

      try {
        const interstitialAdRate = Number(
          (await AsyncStorage.getItem(
            Config.REMOTE_CONFIG_INTERSTITIAL_AD_RATE,
          )) || 1,
        );
        const openAdRate = Number(
          (await AsyncStorage.getItem(Config.REMOTE_CONFIG_OPEN_AD_RATE)) || 1,
        );

        adsStore.setAdRate({
          interstitialAdRate,
          openAdRate,
        });
      } catch (error) {}
    }

    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
