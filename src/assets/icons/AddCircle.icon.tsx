import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AddCircleIcon = (props: SvgProps) => (
  <Svg
    height={responsiveSize(24)}
    width={responsiveSize(24)}
    viewBox="0 0 24 24"
    {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      fill={props.color}
      d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    />
  </Svg>
);

export default AddCircleIcon;
