import React from 'react';

import {Box} from '@plx_tuber/components';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';

const Prototype = () => {
  const theme = useThemeStore(state => state.theme);

  return <Box color={theme.background.default} flex={1} />;
};

export default withPlayerBar(Prototype);
