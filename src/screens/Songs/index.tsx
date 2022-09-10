import React from 'react';
import {TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {SongsScreenProps} from './types';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {SongListItem} from '@plx_tuber/components/shared';
import {ISong} from '@plx_tuber/core/types';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  header__container: {
    position: 'relative',
    minHeight: responsiveSize(70),
  },
  back__btn: {
    ...round(34),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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

  const renderItem = ({item}: {item: ISong}) => (
    <Box p={2}>
      <SongListItem
        thumbnail={item.image}
        artistName={item.artistName}
        songName={item.name}
      />
    </Box>
  );

  const renderHeader = (
    <SafeAreaView>
      <Box style={styles.header__container}>
        <TouchableOpacity onPress={handlePressBack} style={styles.back__btn}>
          <LeftArrowIcon color={colors.white} />
        </TouchableOpacity>

        <Box p={2} center middle flex={1}>
          <Typography variant="h6" color={colors.white} fontWeight="700">
            {title}
          </Typography>
        </Box>
      </Box>
    </SafeAreaView>
  );

  return (
    <Box color={colors.codGray} flex={1}>
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

export default Songs;
