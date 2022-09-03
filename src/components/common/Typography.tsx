import React from 'react';
import {TextProps, Text, StyleSheet} from 'react-native';

import {colors, responsiveSize} from '@plx_tuber/theme';

export interface TypographyProps extends TextProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'caps1'
    | 'caps2'
    | 'caps3'
    | 'caps4'
    | 'caps5'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'b6';
  children: React.ReactNode;
  color?: string;
  textTransform?: 'uppercase' | 'none' | 'capitalize' | 'lowercase';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontFamily?: string;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const styles = StyleSheet.create({
  root: {
    fontFamily: 'Poppins',
  },
  h1: {},
  h2: {},
  h3: {
    fontSize: responsiveSize(32),
    lineHeight: responsiveSize(48),
  },
  h4: {
    fontSize: responsiveSize(24),
    lineHeight: responsiveSize(28),
  },
  h5: {
    fontSize: responsiveSize(20),
    lineHeight: responsiveSize(24),
  },
  h6: {
    fontSize: responsiveSize(18),
    lineHeight: responsiveSize(20),
  },
  h7: {
    fontSize: responsiveSize(16),
    lineHeight: responsiveSize(24),
  },
  caps1: {
    fontSize: responsiveSize(15),
    lineHeight: responsiveSize(26),
  },
  caps2: {
    fontSize: responsiveSize(13),
    lineHeight: responsiveSize(20),
  },
  caps3: {
    fontSize: responsiveSize(12),
    lineHeight: responsiveSize(18),
  },
  caps4: {
    fontSize: responsiveSize(10),
    lineHeight: responsiveSize(12),
  },
  caps5: {},
  b1: {},
  b2: {},
  b3: {},
  b4: {
    fontSize: responsiveSize(18),
    lineHeight: responsiveSize(27),
  },
  b5: {
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(21),
  },
  b6: {},
});

export default function Typography({
  variant,
  color,
  textTransform,
  textAlign,
  fontFamily,
  fontWeight,
  style,
  children,
  ...props
}: TypographyProps) {
  const variantStyle = variant ? styles[variant] : {};
  return (
    <Text
      {...props}
      style={[
        styles.root,
        color && {color},
        textTransform && {textTransform},
        textAlign && {textAlign},
        fontFamily && {fontFamily},
        fontWeight && {fontWeight},
        variantStyle,
        style,
      ]}>
      {children}
    </Text>
  );
}

Typography.defaultProps = {
  variant: undefined,
  color: colors.black,
  textTransform: undefined,
};
