import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const EditFillIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(23)}
    height={responsiveSize(25)}
    viewBox="0 0 23 25"
    {...props}>
    <Path
      d="M19.766 19.715H3.234c-.397 0-.718.335-.718.75v.844c0 .103.08.187.18.187h17.609c.099 0 .18-.084.18-.187v-.844c0-.415-.322-.75-.72-.75ZM5.788 17.746c.045 0 .09-.005.135-.012l3.778-.691a.217.217 0 0 0 .119-.066l9.521-9.935a.234.234 0 0 0 .066-.165.242.242 0 0 0-.066-.165l-3.733-3.898a.218.218 0 0 0-.16-.068.217.217 0 0 0-.159.068L5.768 12.75a.242.242 0 0 0-.063.124l-.663 3.943a.818.818 0 0 0 .212.698c.148.15.334.232.534.232Z"
      fill={props.color}
    />
  </Svg>
);

export default EditFillIcon;
