import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AddIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(21)}
    height={responsiveSize(23)}
    viewBox="0 0 21 23"
    {...props}>
    <Path
      d="M10.5.219c.348 0 .682.145.928.402.246.258.384.608.384.973v8.25h7.876c.348 0 .681.145.928.402.246.258.384.608.384.973 0 .364-.138.714-.384.972-.247.258-.58.403-.928.403h-7.875v8.25c0 .364-.139.714-.385.972s-.58.403-.928.403c-.348 0-.682-.145-.928-.403a1.409 1.409 0 0 1-.384-.972v-8.25H1.311c-.348 0-.681-.145-.928-.403A1.409 1.409 0 0 1 0 11.219c0-.365.138-.715.384-.973.247-.257.58-.402.928-.402h7.875v-8.25c0-.365.139-.715.385-.973.246-.257.58-.402.928-.402Z"
      fill={props.color}
    />
  </Svg>
);

export default AddIcon;
