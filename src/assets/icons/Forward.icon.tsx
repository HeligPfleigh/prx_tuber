import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const ForwardIcon = (props: SvgProps) => (
  <Svg width={16} height={23} viewBox="0 0 16 23" {...props}>
    <Path
      d="M12.947 12.06 1.09 21.375A.673.673 0 0 1 0 20.851V2.22c0-.559.648-.871 1.09-.525l11.857 9.315a.667.667 0 0 1 0 1.05Zm.545 10.368h1.98a.247.247 0 0 0 .248-.247V.89a.247.247 0 0 0-.248-.248h-1.98a.247.247 0 0 0-.248.248v21.29a.248.248 0 0 0 .248.247Z"
      fill={props.color}
    />
  </Svg>
);

export default ForwardIcon;
