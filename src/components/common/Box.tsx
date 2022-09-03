import React, {PureComponent, ReactNode} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, ViewProps} from 'react-native';

import {colors, spacing} from '@plx_tuber/theme';

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: 6,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
});

interface IBoxProps extends ViewProps {
  m?: number;
  mt?: number;
  ml?: number;
  mb?: number;
  mr?: number;
  p?: number;
  pt?: number;
  pl?: number;
  pb?: number;
  pr?: number;
  flex?: any;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  card?: boolean;
  shadow?: boolean;
  color?: string;
  space?: 'between' | 'around' | 'evenly';
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export default class Box extends PureComponent<IBoxProps> {
  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      card,
      shadow,
      color,
      space,
      m,
      mt,
      ml,
      mr,
      mb,
      p,
      pt,
      pl,
      pr,
      pb,
      wrap,
      style,
      children,
      ...props
    } = this.props;

    const blockStyles: StyleProp<ViewStyle> = [
      // styles.block,
      flex && {flex},
      // flex === false && {flex: 0}, // reset / disable flex
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      card && styles.card,
      shadow && styles.shadow,
      space && {
        justifyContent: `space-${space}` as
          | 'space-between'
          | 'space-around'
          | 'space-evenly',
      },
      wrap && {flexWrap: 'wrap'},
      m ? {margin: spacing(m)} : {},
      mt ? {marginTop: spacing(mt)} : {},
      mb ? {marginBottom: spacing(mb)} : {},
      ml ? {marginLeft: spacing(ml)} : {},
      mr ? {marginRight: spacing(mr)} : {},
      p ? {padding: spacing(p)} : {},
      pt ? {paddingTop: spacing(pt)} : {},
      pb ? {paddingBottom: spacing(pb)} : {},
      pl ? {paddingLeft: spacing(pl)} : {},
      pr ? {paddingRight: spacing(pr)} : {},
      color ? {backgroundColor: color} : {}, // custom backgroundColor
      style && style, // rewrite predefined styles
    ];

    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}
