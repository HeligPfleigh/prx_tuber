import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HomeIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.color}
      d="m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3 2 12h3v8h6v-6h2v6h6v-8h3"
    />
  </Svg>
);

export default HomeIcon;
