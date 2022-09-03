import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SearchIcon = (props: SvgProps) => (
  <Svg width={19} height={19} {...props}>
    <Path
      d="m17.652 17.446-3.782-3.788 3.782 3.788Zm-1.686-8.851a7.165 7.165 0 1 1-14.33 0 7.165 7.165 0 0 1 14.33 0v0Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default SearchIcon;
