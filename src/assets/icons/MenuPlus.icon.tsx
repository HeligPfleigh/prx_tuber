import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const MenuPlusIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(23)}
    height={responsiveSize(17)}
    viewBox="0 0 23 17"
    {...props}>
    <Path
      d="M1.035 1.042h15.963M1.035 6.363h15.963M1.035 11.684h10.642"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.991 11.38V8.72a.89.89 0 0 0-.887-.887.89.89 0 0 0-.887.887v2.66h-2.66a.89.89 0 0 0-.887.887.89.89 0 0 0 .887.887h2.66v2.66c0 .488.4.887.887.887a.89.89 0 0 0 .887-.886v-2.66h2.66a.89.89 0 0 0 .887-.888.89.89 0 0 0-.887-.886h-2.66Z"
      fill={props.color}
    />
  </Svg>
);

export default MenuPlusIcon;
