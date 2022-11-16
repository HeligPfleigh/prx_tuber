import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import Config from 'react-native-config';
import dayjs from 'dayjs';

import ClockIcon from '@plx_tuber/assets/icons/Clock.icon';
import EmailIcon from '@plx_tuber/assets/icons/Email.icon';
import LightIcon from '@plx_tuber/assets/icons/Light.icon';
// import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import PrivacyIcon from '@plx_tuber/assets/icons/Privacy.icon';
import StartIcon from '@plx_tuber/assets/icons/Star.icon';
import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {SettingScreenProps} from './types';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SLEEPTIME} from '@plx_tuber/core/constants';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: spacing(2),
  },
  border__radius: {
    borderRadius: responsiveSize(9),
  },
});

const googlePlayLink = `https://play.google.com/store/apps/details?id=${Config.GOOGLEPLAY_ID}`;
const appleStoreLink = `https://itunes.apple.com/us/app/id/${Config.APPSTORE_ID}`;

const rateLink =
  Platform.OS === 'ios'
    ? `${appleStoreLink}&action=write-review`
    : googlePlayLink;

const Settings: React.FC<SettingScreenProps> = ({navigation}) => {
  const [date, setDate] = useState<Date>(new Date());
  const insets = useSafeAreaInsets();
  const theme = useThemeStore(state => state.theme);
  const toggleDarkLightTheme = useThemeStore(
    state => state.toggleDarkLightTheme,
  );
  const toast = useToast();

  useEffect(() => {
    const loadSleepTime = async () => {
      const sleeptime = await AsyncStorage.getItem(SLEEPTIME);
      if (sleeptime) {
        AsyncStorage.getItem(SLEEPTIME);
        setDate(dayjs(sleeptime).toDate());
      }
    };

    loadSleepTime();
  }, []);

  const handlePressRateAndReview = () => Linking.openURL(rateLink);

  const handlePressEmail = () =>
    Linking.openURL(`mailto:${Config.FEEDBACK_EMAIL}`);

  const handlePressPrivacyPolicy = () => {
    navigation.navigate(NavigatorMap.Policy);
  };

  const handleSaveSleepTime = () => {
    AsyncStorage.setItem(SLEEPTIME, date.toISOString());
    toast.show('Sleep time has been saved!');
  };

  const handleClearSleepTime = () => {
    AsyncStorage.removeItem(SLEEPTIME);
    toast.show('Sleep time is cleared!');
  };

  const settings = [
    // {
    //   icon: <PlayIcon color={theme.primary} />,
    //   title: 'Stream quality',
    //   status: 'Normal',
    // },
    {
      icon: <LightIcon color={theme.primary} />,
      title: 'Light Mode',
      status: theme.key === 'light' ? 'On' : 'Off',
      onPress: toggleDarkLightTheme,
    },
    {
      icon: <StartIcon color={theme.primary} />,
      title: 'Rate this app',
      onPress: handlePressRateAndReview,
    },
    {
      icon: <EmailIcon color={theme.primary} />,
      title: 'Contact us',
      onPress: handlePressEmail,
    },
    {
      icon: <PrivacyIcon color={theme.primary} />,
      title: 'Privacy policy',
      onPress: handlePressPrivacyPolicy,
    },
  ];

  return (
    <ScrollView
      style={[styles.root, {backgroundColor: theme.background.default}]}>
      <Box row space="between" center mb={4} style={{paddingTop: insets.top}}>
        <Typography variant="h6" color={theme.primary} fontWeight="700">
          Setting
        </Typography>
      </Box>

      {settings.map(setting => (
        <TouchableOpacity key={setting.title} onPress={setting.onPress}>
          <Box
            p={2}
            color={theme.background.settingItem}
            style={styles.border__radius}
            row
            center
            mb={2}>
            <Box mr={2}>{setting.icon}</Box>
            <Box flex={1}>
              <Typography variant="b5" color={theme.text.primary}>
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
        color={theme.background.settingItem}
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

        <Box center>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="time"
            androidVariant="nativeAndroid"
            textColor={theme.text.primary}
          />
        </Box>

        <Box middle row>
          <TouchableOpacity onPress={handleSaveSleepTime}>
            <Box
              color={colors.sunsetOrange}
              pl={4}
              p={4}
              pt={1}
              pb={1}
              mr={1}
              style={styles.border__radius}>
              <Typography variant="b5" color={colors.white}>
                Set
              </Typography>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleClearSleepTime}>
            <Box
              color={colors.sunsetOrange}
              pl={4}
              p={4}
              pt={1}
              pb={1}
              style={styles.border__radius}>
              <Typography variant="b5" color={colors.white}>
                Clear
              </Typography>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default withPlayerBar(Settings);
