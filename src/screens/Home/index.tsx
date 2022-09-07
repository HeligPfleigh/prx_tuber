import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import SearchIcon from '@plx_tuber/assets/icons/Search.icon';
import HotTopics from './HotTopics';
import TopSongs from './TopSongs';
import {getJamendoCharts} from '@plx_tuber/core/apis';
import Discover from './Discover';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.codGray,
    padding: spacing(2),
  },
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
  const {data: jamendoData, isLoading: jamendoIsLoading} = useQuery(
    ['jamendo_chart'],
    getJamendoCharts,
  );

  if (jamendoIsLoading) {
    return (
      <Box flex={1} color={colors.codGray} p={2}>
        <ActivityIndicator />
      </Box>
    );
  }

  const hotTopic = jamendoData?.hotTopic || [];
  const discover = jamendoData?.discover || [];

  return (
    <ScrollView style={styles.container}>
      <Box row space="between" center>
        <Typography variant="h6" color={colors.white} fontWeight="700">
          Hello, Welcome back!
        </Typography>

        <TouchableOpacity style={styles.searchContainer}>
          <SearchIcon color={colors.white} />
        </TouchableOpacity>
      </Box>

      <Box mt={5}>
        <HotTopics topics={hotTopic} />
      </Box>

      <Box mt={3.5}>
        <TopSongs />
      </Box>

      <Box mt={4} mb={4}>
        <Discover playlist={discover} />
      </Box>
    </ScrollView>
  );
};

export default Home;
