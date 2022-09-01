import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const DiscoverFillIcon = (props: SvgProps) => (
  <Svg width={38} height={38} viewBox="0 0 38 38" {...props}>
    <Path
      d="M18.84 19.878a.981.981 0 1 0 0-1.962.981.981 0 0 0 0 1.962Z"
      fill={props.color}
    />
    <Path
      d="M18.84 10.394c-4.69 0-8.504 3.814-8.504 8.503 0 4.688 3.815 8.503 8.503 8.503 4.689 0 8.503-3.815 8.503-8.503 0-4.689-3.814-8.503-8.503-8.503Zm4.294 4.633-1.916 4.79a2.616 2.616 0 0 1-1.458 1.459l-4.791 1.916a.327.327 0 0 1-.425-.425l1.916-4.791a2.616 2.616 0 0 1 1.458-1.458L22.71 14.6a.326.326 0 0 1 .425.426Z"
      fill={props.color}
    />
  </Svg>
);

export default DiscoverFillIcon;
