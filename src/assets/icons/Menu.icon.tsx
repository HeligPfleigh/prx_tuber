import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Circle} from 'react-native-svg';

const MenuIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(3)}
    height={responsiveSize(13)}
    viewBox="0 0 3 13"
    {...props}>
    <Circle cx={1.25} cy={1.897} r={1.25} fill={props.color} />
    <Circle cx={1.25} cy={6.381} r={1.25} fill={props.color} />
    <Circle cx={1.25} cy={10.864} r={1.25} fill={props.color} />
  </Svg>
);

export default MenuIcon;
