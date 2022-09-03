import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize} from '@plx_tuber/theme';
import SearchIcon from '@plx_tuber/assets/icons/Search.icon';
import HotTopics from './HotTopics';

const styles = StyleSheet.create({
  searchContainer: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(8),
    borderWidth: responsiveSize(1),
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  return (
    <Box flex={1} color={colors.codGray} p={2}>
      <Box row space="between" center>
        <Typography variant="h6" color={colors.white} fontWeight="700">
          Hello, Welcome back!
        </Typography>

        <TouchableOpacity style={styles.searchContainer}>
          <SearchIcon color={colors.white} />
        </TouchableOpacity>
      </Box>

      <Box mt={5}>
        <HotTopics />
      </Box>
    </Box>
  );
};

export default Home;
