import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import ClockIcon from '@plx_tuber/assets/icons/Clock.icon';
import EmailIcon from '@plx_tuber/assets/icons/Email.icon';
import LightIcon from '@plx_tuber/assets/icons/Light.icon';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import PrivacyIcon from '@plx_tuber/assets/icons/Privacy.icon';
import StartIcon from '@plx_tuber/assets/icons/Star.icon';
import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.codGray,
    flex: 1,
    padding: spacing(2),
  },
  border__radius: {
    borderRadius: responsiveSize(9),
  },
});

const Settings = () => {
  const [date, setDate] = useState<Date>();
  const insets = useSafeAreaInsets();

  const onChange = (_event: unknown, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const settings = [
    {
      icon: <PlayIcon color={colors.white} />,
      title: 'Stream quality',
      status: 'Normal',
    },
    {
      icon: <LightIcon color={colors.white} />,
      title: 'Light Mode',
      status: 'Off',
    },
    {
      icon: <StartIcon color={colors.white} />,
      title: 'Rate this app',
    },
    {
      icon: <EmailIcon color={colors.white} />,
      title: 'Contact us',
    },
    {
      icon: <PrivacyIcon color={colors.white} />,
      title: 'Privacy policy',
    },
  ];

  return (
    <ScrollView style={styles.root}>
      <Box row space="between" center mb={4} style={{paddingTop: insets.top}}>
        <Typography variant="h6" color={colors.white} fontWeight="700">
          Setting
        </Typography>
      </Box>

      {settings.map(setting => (
        <TouchableOpacity key={setting.title}>
          <Box
            p={2}
            color="rgba(255, 255, 255, 0.14)"
            style={styles.border__radius}
            row
            center
            mb={2}>
            <Box mr={2}>{setting.icon}</Box>
            <Box flex={1}>
              <Typography variant="b5" color={colors.white}>
                {setting.title}
              </Typography>
            </Box>
            <Typography variant="b5" color={colors.caribbeanGreen100}>
              {setting.status || ''}
            </Typography>
          </Box>
        </TouchableOpacity>
      ))}

      <Box
        p={2}
        color="rgba(255, 255, 255, 0.14)"
        style={styles.border__radius}
        mb={2}>
        <Box row center>
          <Box mr={2}>
            <ClockIcon color={colors.white} />
          </Box>
          <Box flex={1}>
            <Typography variant="b5" color={colors.white}>
              Sleep timer
            </Typography>
          </Box>
        </Box>

        <DateTimePicker
          value={date || new Date()}
          mode="time"
          is24Hour={true}
          onChange={onChange}
          display="spinner"
          textColor={colors.white}
        />

        <Box center>
          <TouchableOpacity>
            <Box
              color={colors.sunsetOrange}
              pl={4}
              p={4}
              pt={1}
              pb={1}
              style={styles.border__radius}>
              <Typography color={colors.white}>Start</Typography>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Settings;
