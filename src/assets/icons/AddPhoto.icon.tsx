import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AddPhotoIcon = (props: SvgProps) => (
  <Svg width={24} height={25} viewBox="0 0 24 25" {...props}>
    <Path
      d="M18.25 21.783H2.5V6.033h10.125v-2.25H2.5a2.257 2.257 0 0 0-2.25 2.25v15.75a2.257 2.257 0 0 0 2.25 2.25h15.75a2.257 2.257 0 0 0 2.25-2.25V11.658h-2.25v10.125Zm-8.764-3.567-2.205-2.655-3.093 3.972h12.375l-3.983-5.299-3.094 3.982ZM20.5 3.784V.408h-2.25v3.375h-3.375c.011.011 0 2.25 0 2.25h3.375v3.363c.011.012 2.25 0 2.25 0V6.033h3.375v-2.25H20.5Z"
      fill={props.color}
    />
  </Svg>
);

export default AddPhotoIcon;
