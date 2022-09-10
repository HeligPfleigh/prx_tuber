import React from 'react';

import {Box} from '@plx_tuber/components';
import {colors} from '@plx_tuber/theme';
import {withPlayerBar} from '@plx_tuber/components/shared';

const Prototype = () => {
  return <Box color={colors.codGray} flex={1} />;
};

export default withPlayerBar(Prototype);
