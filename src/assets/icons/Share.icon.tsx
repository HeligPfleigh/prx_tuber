import {responsiveSize} from '@plx_tuber/theme';
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const ShareIcon = (props: SvgProps) => (
  <Svg
    width={responsiveSize(23)}
    height={responsiveSize(24)}
    viewBox="0 0 23 24"
    {...props}>
    <Path
      d="M16.531 15.039a3.594 3.594 0 0 0-2.796 1.358l-5.254-3.284a3.206 3.206 0 0 0 0-1.898l5.254-3.285a3.593 3.593 0 1 0-.797-2.235c.003.321.051.64.143.949L7.827 9.928a3.594 3.594 0 1 0 0 4.471l5.254 3.285c-.092.308-.14.627-.143.948a3.594 3.594 0 1 0 3.593-3.593Zm0-11.5a2.156 2.156 0 1 1 0 4.312 2.156 2.156 0 0 1 0-4.312ZM5.031 14.32a2.156 2.156 0 1 1 0-4.313 2.156 2.156 0 0 1 0 4.313Zm11.5 6.469a2.155 2.155 0 1 1 0-4.311 2.155 2.155 0 0 1 0 4.31Z"
      fill={props.color}
    />
  </Svg>
);

export default ShareIcon;
