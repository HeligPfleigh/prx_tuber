import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const DeleteIcon = (props: SvgProps) => (
  <Svg width={23} height={25} viewBox="0 0 23 25" {...props}>
    <Path
      d="M8.086 4.872h-.18c.1 0 .18-.084.18-.187v.187h6.828v-.187c0 .103.08.187.18.187h-.18V6.56h1.617V4.685c0-.828-.644-1.5-1.437-1.5H7.906c-.793 0-1.437.672-1.437 1.5V6.56h1.617V4.872Zm11.32 1.688H3.594c-.398 0-.719.335-.719.75v.75c0 .103.08.187.18.187H4.41l.555 12.258c.036.8.67 1.43 1.435 1.43H16.6c.768 0 1.399-.629 1.435-1.43l.555-12.258h1.356c.1 0 .18-.084.18-.187v-.75c0-.415-.321-.75-.719-.75Zm-2.98 13.687H6.574l-.543-12h10.938l-.543 12Z"
      fill={props.color}
    />
  </Svg>
);

export default DeleteIcon;
