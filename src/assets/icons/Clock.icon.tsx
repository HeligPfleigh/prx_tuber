import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const ClockIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      fill={props.color}
      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
    />
    <Path fill={props.color} d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </Svg>
);

export default ClockIcon;
