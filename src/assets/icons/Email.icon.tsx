import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const EmailIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      fill={props.color}
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);

export default EmailIcon;
