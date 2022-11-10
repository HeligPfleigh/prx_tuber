import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const DiscoverFillIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(24)}
    height={responsiveSize(24)}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={props.color}
      d="M14.19 14.19 6 18l3.81-8.19L18 6m-6-4A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 8.9a1.1 1.1 0 0 0-1.1 1.1 1.1 1.1 0 0 0 1.1 1.1 1.1 1.1 0 0 0 1.1-1.1 1.1 1.1 0 0 0-1.1-1.1Z"
    />
  </Svg>
);

export default DiscoverFillIcon;
