import {PixelRatio, Platform} from 'react-native';

const SPACING_UNIT = 8;

// const commonPixelRatio = 1.5;
const isIPad = Platform.OS === 'ios' && Platform.isPad;
const currentRatio = isIPad ? 2 : 1; // Math.min(commonPixelRatio / PixelRatio.get(), 1);

/**
 * Responsive for xhdpi/ xxhdpi base on hdpi size
 * @param amount size in hdpi ratio (1.5)
 * @returns size in expected pixel ratio
 */
export const responsiveSize = (amount: number) =>
  PixelRatio.roundToNearestPixel(amount * currentRatio);

export const spacing = (value: number) => responsiveSize(value * SPACING_UNIT);

export const round = (size: number) => ({
  width: responsiveSize(size),
  height: responsiveSize(size),
  borderRadius: responsiveSize(size / 2),
});

export const size = (value: number) => ({
  width: responsiveSize(value),
  height: responsiveSize(value),
});
