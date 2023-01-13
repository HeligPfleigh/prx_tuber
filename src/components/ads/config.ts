import {TestIds} from 'react-native-google-mobile-ads';
import {TestIds as OtherTestIds} from 'react-native-admob-native-ads';
import {Platform} from 'react-native';

// TODO: replace with real ad id
export const adConfigs = {
  interstitialAdUnitId: __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/3153137752',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  openAdUnitId: __DEV__
    ? TestIds.APP_OPEN
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/2414771154',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  nativeAdUnitId: __DEV__
    ? OtherTestIds.Image
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/8799112453',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  bannerAdUnitId: __DEV__
    ? TestIds.BANNER
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/3318473491',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  rewardedAdUnitId: __DEV__
    ? TestIds.REWARDED
    : Platform.select({
        ios: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
};
