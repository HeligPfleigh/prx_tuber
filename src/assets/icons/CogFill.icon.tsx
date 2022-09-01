import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const CogFillIcon = (props: SvgProps) => (
  <Svg width={38} height={38} viewBox="0 0 38 38" {...props}>
    <Path
      d="M18.957 16.487c-.568 0-1.1.22-1.503.623a2.117 2.117 0 0 0-.624 1.504c0 .568.223 1.1.624 1.503.403.401.935.624 1.503.624.569 0 1.1-.223 1.504-.624.4-.403.623-.935.623-1.503 0-.568-.222-1.1-.623-1.504a2.109 2.109 0 0 0-1.504-.623Zm7.837 4.476-1.243-1.062a6.832 6.832 0 0 0 0-2.194l1.243-1.062a.609.609 0 0 0 .177-.67l-.018-.049a8.41 8.41 0 0 0-1.513-2.617l-.034-.04a.61.61 0 0 0-.667-.18l-1.543.549a6.638 6.638 0 0 0-1.893-1.093l-.299-1.614a.61.61 0 0 0-.49-.488l-.052-.01a8.564 8.564 0 0 0-3.018 0l-.051.01a.61.61 0 0 0-.49.488l-.3 1.622a6.72 6.72 0 0 0-1.88 1.089l-1.555-.553a.608.608 0 0 0-.667.18l-.035.04a8.475 8.475 0 0 0-1.513 2.617l-.017.05a.61.61 0 0 0 .177.669l1.258 1.074a6.685 6.685 0 0 0 0 2.166l-1.254 1.074a.608.608 0 0 0-.177.67l.017.049c.344.956.852 1.84 1.513 2.617l.034.04a.61.61 0 0 0 .668.18l1.554-.553a6.583 6.583 0 0 0 1.88 1.09l.3 1.62a.61.61 0 0 0 .49.49l.052.009c.998.18 2.02.18 3.018 0l.052-.01a.61.61 0 0 0 .49-.488l.298-1.614a6.68 6.68 0 0 0 1.893-1.093l1.544.55a.608.608 0 0 0 .667-.181l.034-.04a8.475 8.475 0 0 0 1.513-2.617l.017-.05a.614.614 0 0 0-.18-.665Zm-7.837.992a3.341 3.341 0 1 1 0-6.682 3.341 3.341 0 0 1 0 6.682Z"
      fill={props.color}
    />
  </Svg>
);

export default CogFillIcon;
