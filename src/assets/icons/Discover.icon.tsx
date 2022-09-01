import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const DiscoverIcon = (props: SvgProps) => (
  <Svg width={19} height={19} fill="none" viewBox="0 0 19 19" {...props}>
    <Path
      d="M18.342 9.161A8.505 8.505 0 0 0 9.84.658 8.505 8.505 0 0 0 1.336 9.16a8.505 8.505 0 0 0 8.503 8.503 8.505 8.505 0 0 0 8.503-8.503Z"
      stroke={props.color}
      strokeWidth={1.25}
      strokeMiterlimit={10}
    />
    <Path
      d="m14.032 4.508-5.19 2.076a2.835 2.835 0 0 0-1.58 1.58l-2.076 5.19a.354.354 0 0 0 .46.46l5.19-2.076a2.835 2.835 0 0 0 1.58-1.58l2.076-5.19a.354.354 0 0 0-.46-.46Zm-4.193 5.716a1.063 1.063 0 1 1 0-2.126 1.063 1.063 0 0 1 0 2.126Z"
      fill={props.color}
    />
  </Svg>
);

export default DiscoverIcon;
