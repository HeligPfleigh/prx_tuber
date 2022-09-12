import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, round, spacing} from '@plx_tuber/theme';
import {SongListItem, withPlayerBar} from '@plx_tuber/components/shared';
import {ISong} from '@plx_tuber/core/types';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {SearchScreenProps} from './types';
import SearchIcon from '@plx_tuber/assets/icons/Search.icon';
import {searchSong} from '@plx_tuber/core/apis';
import {useThemeStore} from '@plx_tuber/stores/theme';

const styles = StyleSheet.create({
  root: {
    // paddingHorizontal: spacing(2),
  },
  header__container: {
    position: 'relative',
    minHeight: responsiveSize(40),
  },
  back__btn: {
    ...round(34),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  input__container: {
    backgroundColor: colors.white,
    borderRadius: responsiveSize(8),
    paddingLeft: spacing(1),
    paddingVertical: spacing(0.5),
  },
  input: {
    color: colors.codGray,
    textAlignVertical: 'top',
    padding: spacing(1),
    borderRadius: responsiveSize(8),
  },
});

const Search: React.FC<SearchScreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState<string>('');

  const theme = useThemeStore(state => state.theme);

  const {data, isLoading, isFetched, refetch} = useQuery(
    ['search', searchText],
    () => searchSong(searchText),
    {enabled: Boolean(searchText)},
  );

  const insets = useSafeAreaInsets();

  const handlePressBack = () => navigation.goBack();

  const renderItem = ({item}: {item: ISong}) => (
    <Box pb={2}>
      <SongListItem song={item} />
    </Box>
  );

  const resultTitle = useMemo(() => {
    if (searchText && isFetched) {
      if (data?.length) {
        return `Result for “${searchText}”`;
      }
      return `No result for “${searchText}”`;
    }

    return null;
  }, [searchText, isFetched, data]);

  return (
    <Box color={theme.background.default} flex={1} p={2}>
      <Box column style={{paddingTop: insets.top}} mb={2}>
        <Box style={[styles.header__container]}>
          <TouchableOpacity
            onPress={handlePressBack}
            style={[
              styles.back__btn,
              {backgroundColor: theme.background.back},
            ]}>
            <LeftArrowIcon color={colors.white} />
          </TouchableOpacity>

          <Box center middle flex={1}>
            <Typography
              variant="h6"
              color={theme.text.primary}
              fontWeight="700">
              Search
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        row
        center
        style={[
          styles.input__container,
          {backgroundColor: theme.background.default},
        ]}>
        <SearchIcon color={colors.silver} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
          placeholder="Search song by title"
          placeholderTextColor={colors.silver}
          autoFocus
        />
      </Box>

      {resultTitle ? (
        <Box mt={2} mb={2}>
          <Typography variant="b5" color={theme.text.primary} fontWeight="700">
            {resultTitle}
          </Typography>
        </Box>
      ) : null}

      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.root}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </Box>
  );
};

export default withPlayerBar(Search);
