import {colors, responsiveSize} from '@plx_tuber/theme';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import NativeAdView, {
  AdBadge,
  AdvertiserView,
  CallToActionView,
  NativeMediaView,
  TaglineView,
} from 'react-native-admob-native-ads';

import {Box} from '../common';
import {adConfigs} from './config';

const styles = StyleSheet.create({
  badge: {
    width: responsiveSize(15),
    height: responsiveSize(15),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.bondiBlue,
    position: 'absolute',
    zIndex: 2,
  },
  badgeText: {
    fontSize: responsiveSize(9),
    color: colors.bondiBlue,
  },
  image: {
    width: '100%',
    height: responsiveSize(120),
  },
  tagline: {
    fontSize: responsiveSize(12),
    color: colors.white,
  },
  advertiser: {
    fontSize: responsiveSize(10),
    color: colors.white,
  },
  callToAction: {
    height: responsiveSize(40),
    width: responsiveSize(90),
    paddingHorizontal: responsiveSize(12),
    backgroundColor: colors.bondiBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(5),
    elevation: 10,
  },
  callToActionText: {
    color: colors.white,
    fontSize: responsiveSize(14),
  },
});

const BasicNativeAdsView: React.FC = () => {
  const nativeAdViewRef = React.useRef<NativeAdView>(null);

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      adUnitID={adConfigs.nativeAdUnitId}
      ref={nativeAdViewRef}
      adChoicesPlacement="topRight">
      <Box row style={{height: responsiveSize(135)}}>
        <AdBadge style={styles.badge} textStyle={styles.badgeText} />

        <Box flex={2} mt={2}>
          <NativeMediaView style={styles.image} />
        </Box>

        <Box flex={2} center middle mt={2}>
          <TaglineView style={styles.tagline} />
          <AdvertiserView style={styles.advertiser} />
          <CallToActionView
            style={styles.callToAction}
            textStyle={styles.callToActionText}
          />
        </Box>
      </Box>
    </NativeAdView>
  );
};

export default memo(BasicNativeAdsView);
