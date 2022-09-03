import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const UserIcon = (props: SvgProps) => (
  <Svg width={58} height={68} viewBox="0 0 58 68" {...props}>
    <Path
      d="M38.864 31.386c4.268-3.113 7.048-8.15 7.048-13.825C45.912 8.13 38.239.458 28.809.458c-9.431 0-17.104 7.672-17.104 17.103 0 5.675 2.78 10.712 7.048 13.825C8.143 35.446.588 45.733.588 57.753c0 5.187 4.22 9.407 9.407 9.407h37.627c5.187 0 9.407-4.22 9.407-9.407 0-12.02-7.555-22.307-18.165-26.367ZM16.837 17.561c0-6.602 5.37-11.972 11.972-11.972 6.601 0 11.972 5.37 11.972 11.972 0 6.601-5.371 11.972-11.972 11.972-6.602 0-11.973-5.37-11.973-11.972Zm30.785 44.468H9.995a4.28 4.28 0 0 1-4.276-4.276c0-12.732 10.358-23.09 23.09-23.09 12.731 0 23.089 10.358 23.089 23.09a4.28 4.28 0 0 1-4.276 4.276Z"
      fill={props.color}
    />
  </Svg>
);

export default UserIcon;
