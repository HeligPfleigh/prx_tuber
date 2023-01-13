import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Box, Typography} from '@plx_tuber/components';
import {responsiveSize} from '@plx_tuber/theme';
import {useQuery} from '@tanstack/react-query';
import {getTopSong} from '@plx_tuber/core/apis';
import {
  AddToPlaylistModal,
  PlayerModal,
  SongListItem,
} from '@plx_tuber/components/shared';
import {HomeNavigationProps} from './types';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {ISong} from '@plx_tuber/core/types';
import {useThemeStore} from '@plx_tuber/stores/theme';
import BasicNativeAdsView from '@plx_tuber/components/ads/BasicNativeAdsView';

const styles = StyleSheet.create({
  seeAll__btn: {
    width: responsiveSize(60),
    height: responsiveSize(24),
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TopSongs = () => {
  const query = useQuery(['topSong'], getTopSong);

  const navigation = useNavigation<HomeNavigationProps>();

  const [selectedSong, setSelectedSong] = useState<ISong>();

  const [openPlayerModal, setOpenPlayerModal] = useState<boolean>(false);
  const togglePlayerModal = () => setOpenPlayerModal(prev => !prev);

  const [openAddToPlaylistModal, setOpenToPlaylistModal] =
    useState<boolean>(false);
  const toggleAddToPlaylistModal = () => setOpenToPlaylistModal(prev => !prev);

  const theme = useThemeStore(state => state.theme);

  const handleSeeAll = () => {
    navigation.navigate(NavigatorMap.Songs, {
      title: 'Top songs',
      songs: query.data || [],
    });
  };

  const handleSelectSong = (song: ISong) => () => {
    setSelectedSong(song);
    togglePlayerModal();
  };

  const handleAddToPlaylist = () => {
    togglePlayerModal();
    // fix open modal on ios
    setTimeout(() => {
      toggleAddToPlaylistModal();
    }, 500);
  };

  return (
    <>
      <Box row space="between" center mb={1.5}>
        <Typography variant="b5" color={theme.text.primary} fontWeight="700">
          Top song
        </Typography>

        <TouchableOpacity
          style={[
            styles.seeAll__btn,
            {backgroundColor: theme.background.seeAll},
          ]}
          onPress={handleSeeAll}>
          <Typography variant="caps3" color={theme.text.primary}>
            See all
          </Typography>
        </TouchableOpacity>
      </Box>

      <Box mb={2}>
        <BasicNativeAdsView />
      </Box>

      {(query.data || []).slice(0, 5).map(item => (
        <Box mb={2} key={item.id}>
          <SongListItem song={item} onMenuPress={handleSelectSong(item)} />
        </Box>
      ))}

      <PlayerModal
        open={openPlayerModal}
        onClose={togglePlayerModal}
        onAddToPlaylist={handleAddToPlaylist}
        song={selectedSong}
      />

      <AddToPlaylistModal
        open={openAddToPlaylistModal}
        onClose={toggleAddToPlaylistModal}
        song={selectedSong}
      />
    </>
  );
};

export default TopSongs;
