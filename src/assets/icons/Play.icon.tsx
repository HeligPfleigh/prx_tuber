import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const PlayIcon = (props: SvgProps) => (
  <Svg width={12} height={15} viewBox="0 0 12 15">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.368 6.258L1.94.568C1.173.106 0 .554 0 1.698v11.376c0 1.026 1.09 1.644 1.94 1.13l9.428-5.688c.841-.505.844-1.752 0-2.258z"
      fill={props.color}
    />
  </Svg>
);

export default PlayIcon;
