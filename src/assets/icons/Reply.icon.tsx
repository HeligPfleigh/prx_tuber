import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const ReplyIcon = (props: SvgProps) => (
  <Svg width={20} height={17} fill="none" viewBox="0 0 20 17" {...props}>
    <Path
      d="M19.536 7.679 11.505.049v4.284C4.01 5.403 1.333 10.758.262 16.11c2.679-3.747 5.89-5.46 11.243-5.46v4.39l8.031-7.362Z"
      fill={props.color}
    />
  </Svg>
);

export default ReplyIcon;
