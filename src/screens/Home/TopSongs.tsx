import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize} from '@plx_tuber/theme';
import {useQuery} from '@tanstack/react-query';
import {getTopSong} from '@plx_tuber/core/apis';
import {PlayerModal, SongListItem} from '@plx_tuber/components/shared';
import {HomeNavigationProps} from './types';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {ISong} from '@plx_tuber/core/types';
import TrackPlayer from 'react-native-track-player';
import {useToast} from 'react-native-toast-notifications';

const styles = StyleSheet.create({
  seeAll__btn: {
    width: responsiveSize(50),
    height: responsiveSize(19),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TopSongs = () => {
  const query = useQuery(['topSong'], getTopSong);
  const navigation = useNavigation<HomeNavigationProps>();
  const [selectedSong, setSelectedSong] = useState<ISong>();
  const toast = useToast();

  const handleSeeAll = () => {
    navigation.navigate(NavigatorMap.Songs, {
      title: 'Top songs',
      songs: query.data || [],
    });
  };

  const handleClosePlayerModal = () => setSelectedSong(undefined);

  const handlePlay = async () => {
    try {
      if (!selectedSong || !selectedSong.audio) {
        throw new Error('Cannot load track!');
      }

      await TrackPlayer.reset();

      await TrackPlayer.add({
        url: selectedSong.audio,
        title: selectedSong.name,
        artist: selectedSong.artistName,
        artwork: selectedSong.image,
      });

      await TrackPlayer.play();
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, {
          type: 'danger',
        });
      }
    } finally {
      handleClosePlayerModal();
    }
  };

  return (
    <>
      <Box row space="between" center mb={1.5}>
        <Typography variant="b5" color={colors.white} fontWeight="700">
          Top song
        </Typography>

        <TouchableOpacity style={styles.seeAll__btn} onPress={handleSeeAll}>
          <Typography variant="caps4" color={colors.white}>
            See all
          </Typography>
        </TouchableOpacity>
      </Box>

      {(query.data || []).slice(0, 5).map(item => (
        <Box mb={2} key={item.id}>
          <SongListItem
            artistName={item.artistName}
            thumbnail={item.image}
            songName={item.name}
            url={item.audio}
            onMenuPress={() => setSelectedSong(item)}
          />
        </Box>
      ))}

      <PlayerModal
        open={Boolean(selectedSong)}
        onClose={handleClosePlayerModal}
        onPlay={handlePlay}
        artist={selectedSong?.artistName || ''}
        thumbnail={selectedSong?.image || ''}
        title={selectedSong?.name || ''}
      />
    </>
  );
};

export default TopSongs;
