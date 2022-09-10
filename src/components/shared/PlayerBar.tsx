import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Progress, Typography} from '../common';
import PauseIcon from '@plx_tuber/assets/icons/Pause.icon';
// import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import {colors, responsiveSize} from '@plx_tuber/theme';

const styles = StyleSheet.create({
  root: {
    height: responsiveSize(52),
    backgroundColor: colors.black,
    width: '100%',
  },
  progress: {
    width: '100%',
  },
  song__thumbnail: {
    width: responsiveSize(85),
    height: responsiveSize(48),
  },
});

const PlayerBar = () => {
  return (
    <TouchableOpacity style={styles.root}>
      <Progress
        style={styles.progress}
        fill={colors.bondiBlue}
        total={100}
        current={90}
      />
      <Box flex={1} row center pr={2}>
        <FastImage
          source={{
            uri: 'https://usercontent.jamendo.com?type=album&id=71856&width=300&trackid=620519',
          }}
          style={styles.song__thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Box flex={1} ml={1.5} mr={1}>
          <Typography variant="b5" color={colors.white}>
            Good 4 U
          </Typography>
          <Typography variant="caps4" color={colors.gray100}>
            Olivia Rodrigo
          </Typography>
        </Box>
        <TouchableOpacity>
          <PauseIcon color={colors.white} />
        </TouchableOpacity>
      </Box>
    </TouchableOpacity>
  );
};

export default PlayerBar;
