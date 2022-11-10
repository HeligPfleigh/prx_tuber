import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HomeFillIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(24)}
    height={responsiveSize(24)}
    viewBox="0 0 24 24"
    {...props}>
    <Path fill={props.color} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z" />
  </Svg>
);

export default HomeFillIcon;
