import {useAdsStore} from '@plx_tuber/stores/ads';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import Config from 'react-native-config';
import {useAppOpenAd as useAppOpenAdDefault} from 'react-native-google-mobile-ads';

import {adConfigs} from './config';

export const useAppOpenAd = () => {
  const {isLoaded, load, show} = useAppOpenAdDefault(adConfigs.openAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const adsStore = useAdsStore(state => state);

  const {openAdRate, openAdDisplayAmount} = adsStore;

  useEffect(() => {
    load();
  }, [load]);

  const handleShowOpenAd = () => {
    adsStore.increaseOpenAdDisplayAmount();
    if (
      !openAdRate ||
      openAdDisplayAmount % openAdRate ||
      !dayjs().isAfter(dayjs(Config.IN_APP_REVIEW_DISABLE_BEFORE_DAY))
    ) {
      return;
    } else {
      show();
    }
  };

  useEffect(() => {
    if (isLoaded) {
      handleShowOpenAd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);
};
