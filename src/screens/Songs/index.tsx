import React from 'react';
import {TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {SongsScreenProps} from './types';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {SongListItem, withPlayerBar} from '@plx_tuber/components/shared';
import {ISong} from '@plx_tuber/core/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '@plx_tuber/stores/theme';
import BasicNativeAdsView from '@plx_tuber/components/ads/BasicNativeAdsView';

const styles = StyleSheet.create({
  header__container: {
    position: 'relative',
    minHeight: responsiveSize(70),
  },
  back__btn: {
    ...round(34),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: spacing(2),
    left: spacing(2),
    zIndex: 2,
  },
});

const Songs: React.FC<SongsScreenProps> = ({route, navigation}) => {
  const handlePressBack = () => navigation.goBack();

  const {title, songs} = route.params;

  const theme = useThemeStore(state => state.theme);

  const renderItem = ({item}: {item: ISong}) => (
    <Box p={2}>
      <SongListItem song={item} />
    </Box>
  );

  const renderHeader = (
    <SafeAreaView>
      <Box style={styles.header__container}>
        <TouchableOpacity
          onPress={handlePressBack}
          style={[styles.back__btn, {backgroundColor: theme.background.back}]}>
          <LeftArrowIcon color={colors.white} />
        </TouchableOpacity>

        <Box p={2} center middle flex={1}>
          <Typography variant="h6" color={theme.text.primary} fontWeight="700">
            {title}
          </Typography>
        </Box>
      </Box>

      <Box pl={2} pr={2}>
        <BasicNativeAdsView />
      </Box>
    </SafeAreaView>
  );

  return (
    <Box color={theme.background.default} flex={1}>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
    </Box>
  );
};

export default withPlayerBar(Songs);
