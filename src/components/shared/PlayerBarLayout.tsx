import React from 'react';

import {Box} from '../common';
import PlayerBar from './PlayerBar';

interface IPlayerBarLayoutProps {
  children: React.ReactElement;
}

export const PlayerBarLayout: React.FC<IPlayerBarLayoutProps> = ({
  children,
}) => {
  return (
    <Box flex={1}>
      {children}
      <PlayerBar />
    </Box>
  );
};

export function withPlayerBar(WrappedComponent: React.FC<any>) {
  return class extends React.Component {
    render() {
      return (
        <PlayerBarLayout>
          <WrappedComponent {...this.props} />
        </PlayerBarLayout>
      );
    }
  };
}
