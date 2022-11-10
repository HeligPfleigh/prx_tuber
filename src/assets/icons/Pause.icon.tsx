import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PauseIcon = (props: SvgProps) => (
  <Svg
    height={responsiveSize(24)}
    width={responsiveSize(24)}
    viewBox="0 0 24 24"
    {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill={props.color} />
  </Svg>
);

export default PauseIcon;
