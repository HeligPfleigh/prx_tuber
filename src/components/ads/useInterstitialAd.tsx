import {useAdsStore} from '@plx_tuber/stores/ads';
import dayjs from 'dayjs';
import Config from 'react-native-config';
import {
  AdHookReturns,
  useInterstitialAd as useInterstitialAdDefault,
} from 'react-native-google-mobile-ads';
import {adConfigs} from './config';

export const useInterstitialAd = (): Omit<
  AdHookReturns,
  'reward' | 'isEarnedReward'
> => {
  const data = useInterstitialAdDefault(adConfigs.interstitialAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const adsStore = useAdsStore(state => state);

  const {interstitialAdRate, interstitialAdDisplayAmount} = adsStore;

  const show = () => {
    adsStore.increaseInterstitialAdDisplayAmount();
    if (
      !interstitialAdRate ||
      interstitialAdDisplayAmount % interstitialAdRate ||
      !dayjs().isAfter(dayjs(Config.IN_APP_REVIEW_DISABLE_BEFORE_DAY))
    ) {
      return;
    } else {
      data.show();
    }
  };

  return {
    ...data,
    show,
  };
};
