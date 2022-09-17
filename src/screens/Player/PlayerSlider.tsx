import {ThumbImage} from '@plx_tuber/assets/images';
import {Box, Typography} from '@plx_tuber/components';
import {convertTimeToMinutes} from '@plx_tuber/core/utils';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {colors, spacing} from '@plx_tuber/theme';
import Slider from '@react-native-community/slider';
import React from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  progress: {width: '100%', marginTop: spacing(4)},
});

const PlayerSlider = () => {
  const theme = useThemeStore(state => state.theme);

  const progress = useProgress();

  const handleChangeTime = async (value: number) => {
    try {
      await TrackPlayer.seekTo(value);
    } catch (error) {}
  };

  return (
    <>
      <Slider
        style={styles.progress}
        minimumValue={0}
        maximumValue={progress.duration}
        minimumTrackTintColor={colors.caribbeanGreen}
        maximumTrackTintColor={theme.background.seeAll}
        thumbImage={ThumbImage}
        onSlidingComplete={handleChangeTime}
        value={progress.position}
      />

      <Box row space="between" center>
        <Typography variant="caps3" color={theme.text.primary}>
          {convertTimeToMinutes(progress.position)}
        </Typography>
        <Typography variant="caps3" color={colors.gray100}>
          {convertTimeToMinutes(progress.duration)}
        </Typography>
      </Box>
    </>
  );
};

export default PlayerSlider;
