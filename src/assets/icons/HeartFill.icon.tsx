import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HeartFillIcon = (props: SvgProps) => (
  <Svg width={39} height={38} viewBox="0 0 36 36" {...props}>
    <Path
      d="M20.326 25.008a1.831 1.831 0 0 1-2.401-.01l-.098-.085c-4.686-4.086-7.747-6.76-7.631-10.098a4.654 4.654 0 0 1 2.088-3.69c2.357-1.548 5.266-.825 6.837.947 1.57-1.772 4.48-2.503 6.836-.946a4.654 4.654 0 0 1 2.089 3.69c.125 3.336-2.946 6.011-7.631 10.114l-.09.078Z"
      fill={props.color}
    />
  </Svg>
);

export default HeartFillIcon;
