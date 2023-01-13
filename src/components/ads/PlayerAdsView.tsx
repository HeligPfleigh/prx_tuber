import {colors, responsiveSize} from '@plx_tuber/theme';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import NativeAdView, {
  AdBadge,
  NativeMediaView,
} from 'react-native-admob-native-ads';

import {Box} from '../common';
import {adConfigs} from './config';

const styles = StyleSheet.create({
  badge: {
    width: responsiveSize(15),
    height: responsiveSize(15),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.scorpion,
    position: 'absolute',
    zIndex: 2,
  },
  badgeText: {
    fontSize: responsiveSize(9),
    color: colors.scorpion,
  },
  image: {
    width: '100%',
    height: responsiveSize(210),
  },
});

const PlayerAdsView: React.FC = () => {
  const nativeAdViewRef = React.useRef<NativeAdView>(null);

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      adUnitID={adConfigs.nativeAdUnitId}
      ref={nativeAdViewRef}
      adChoicesPlacement="topRight">
      <Box row>
        <AdBadge style={styles.badge} textStyle={styles.badgeText} />

        <Box flex={2}>
          <NativeMediaView style={styles.image} />
        </Box>
      </Box>
    </NativeAdView>
  );
};

export default memo(PlayerAdsView);
