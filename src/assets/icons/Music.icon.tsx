import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const MusicIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(27)}
    height={responsiveSize(34)}
    viewBox="0 0 27 34"
    {...props}>
    <Path
      d="M24.477 10.681v12.013a4.75 4.75 0 1 0 2.375 4.114V2.882a1.9 1.9 0 0 0-2.54-1.79L9.111 6.52a1.9 1.9 0 0 0-1.26 1.789v16.758a4.75 4.75 0 1 0 2.375 4.116V15.77l14.25-5.087v-.002Zm0-2.522-14.25 5.087V8.641l14.25-5.09V8.16Zm-2.375 16.274a2.375 2.375 0 1 1 0 4.75 2.375 2.375 0 0 1 0-4.75ZM5.477 26.808a2.375 2.375 0 1 1 0 4.75 2.375 2.375 0 0 1 0-4.75Z"
      fill={props.color}
    />
  </Svg>
);

export default MusicIcon;
