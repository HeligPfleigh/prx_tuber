import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const LeftArrowIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(8)}
    height={responsiveSize(15)}
    viewBox="0 0 8 15"
    {...props}>
    <Path
      d="M6.792 14.735a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 1 1 1.54 1.28l-4.47 5.36 4.32 5.36a1 1 0 0 1-.78 1.64Z"
      fill={props.color}
    />
  </Svg>
);

export default LeftArrowIcon;
