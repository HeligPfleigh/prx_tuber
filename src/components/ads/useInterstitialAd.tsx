import {useAdsStore} from '@plx_tuber/stores/ads';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Config from 'react-native-config';
import {
  AdHookReturns,
  useInterstitialAd as useInterstitialAdDefault,
} from 'react-native-google-mobile-ads';
import {adConfigs} from './config';

export const useInterstitialAd = (
  disableCount?: boolean,
): Omit<AdHookReturns, 'reward' | 'isEarnedReward'> => {
  const data = useInterstitialAdDefault(adConfigs.interstitialAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const adsStore = useAdsStore(state => state);

  const {interstitialAdRate, interstitialAdDisplayAmount} = adsStore;

  useEffect(() => {
    if (data?.isClosed) {
      StatusBar.setHidden(false);
    }
  }, [data?.isClosed]);

  const show = () => {
    if (disableCount) {
      StatusBar.setHidden(true);
      data.show();
      return;
    }

    adsStore.increaseInterstitialAdDisplayAmount();
    if (
      !interstitialAdRate ||
      interstitialAdDisplayAmount % interstitialAdRate ||
      !dayjs().isAfter(dayjs(Config.IN_APP_REVIEW_DISABLE_BEFORE_DAY))
    ) {
      return;
    } else {
      StatusBar.setHidden(true);
      data.show();
    }
  };

  return {
    ...data,
    show,
  };
};
