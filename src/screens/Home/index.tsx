import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, Typography} from '@plx_tuber/components';
import {responsiveSize, spacing} from '@plx_tuber/theme';
import SearchIcon from '@plx_tuber/assets/icons/Search.icon';
import HotTopics from './HotTopics';
import TopSongs from './TopSongs';
import {getJamendoCharts} from '@plx_tuber/core/apis';
import Discover from './Discover';
import {HomeScreenProps} from './types';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import BasicNativeAdsView from '@plx_tuber/components/ads/BasicNativeAdsView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing(2),
  },
  searchContainer: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(8),
    borderWidth: responsiveSize(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const {data: jamendoData, isLoading: jamendoIsLoading} = useQuery(
    ['jamendo_chart'],
    getJamendoCharts,
  );

  const theme = useThemeStore(state => state.theme);

  const insets = useSafeAreaInsets();

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const hotTopic = jamendoData?.hotTopic || [];
  const discover = jamendoData?.discover || [];

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background.default}]}>
      <Box row space="between" center style={{paddingTop: insets.top}}>
        <Typography variant="h6" color={theme.text.primary} fontWeight="700">
          Hello, Welcome back!
        </Typography>

        <TouchableOpacity
          style={[styles.searchContainer, {borderColor: theme.text.primary}]}
          onPress={handleOpenSearch}>
          <SearchIcon color={theme.text.primary} />
        </TouchableOpacity>
      </Box>

      {jamendoIsLoading ? (
        <Box flex={1} color={theme.background.default} p={2}>
          <ActivityIndicator />
        </Box>
      ) : (
        <>
          <Box mt={5}>
            <HotTopics topics={hotTopic} />
          </Box>

          <Box mt={2}>
            <BasicNativeAdsView />
          </Box>

          <Box mt={3.5}>
            <TopSongs />
          </Box>

          <Box mt={4} mb={4}>
            <Discover playlist={discover} />
          </Box>
        </>
      )}
    </ScrollView>
  );
};

export default withPlayerBar(Home);
