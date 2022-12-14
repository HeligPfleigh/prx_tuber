import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const PlayIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(24)}
    height={responsiveSize(24)}
    viewBox="0 0 24 24"
    {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M8 5v14l11-7z" fill={props.color} />
  </Svg>
);

export default PlayIcon;
