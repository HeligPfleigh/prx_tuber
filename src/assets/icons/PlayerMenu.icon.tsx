import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PlayerMenuIcon = (props: SvgProps) => (
  <Svg width={22} height={18} viewBox="0 0 22 18" {...props}>
    <Path
      d="m21 14.235-3.5 2.5v-5l3.5 2.5Z"
      fill={props.color}
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 1.735h18M1 7.735h18M1 13.735h12"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlayerMenuIcon;
