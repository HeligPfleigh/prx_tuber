import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const LoopIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(20)}
    height={responsiveSize(21)}
    viewBox="0 0 20 21"
    {...props}>
    <Path
      d="m.035 3.698 1.28-1.27 16.72 16.72-1.27 1.28-3-3h-8.73v3l-4-4 4-4v3h6.73l-6.73-6.73v.73h-2v-2.73l-3-3Zm15 7.73h2v4.18l-2-2v-2.18Zm0-8v-3l4 4-4 4v-3h-8.18l-2-2h10.18Z"
      fill={props.color}
    />
  </Svg>
);

export default LoopIcon;
