import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const BackwardIcon = (props: SvgProps) => (
  <Svg width={16} height={23} viewBox="0 0 16 23" {...props}>
    <Path
      d="M3.053 11.011 14.91 1.697A.673.673 0 0 1 16 2.22v18.63c0 .559-.648.871-1.09.524L3.054 12.06a.667.667 0 0 1 0-1.049ZM2.508.643H.528A.248.248 0 0 0 .28.891v21.29a.248.248 0 0 0 .248.247h1.98a.248.248 0 0 0 .248-.247V.89a.248.248 0 0 0-.248-.248Z"
      fill={props.color}
    />
  </Svg>
);

export default BackwardIcon;
