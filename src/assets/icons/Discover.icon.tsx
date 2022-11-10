import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const DiscoverIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(24)}
    height={responsiveSize(24)}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={props.color}
      d="m7 17 3.2-6.8L17 7l-3.2 6.8L7 17m5-5.9a.9.9 0 0 0-.9.9.9.9 0 0 0 .9.9.9.9 0 0 0 .9-.9.9.9 0 0 0-.9-.9M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8Z"
    />
  </Svg>
);

export default DiscoverIcon;
