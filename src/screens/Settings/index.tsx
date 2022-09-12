import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';
import Config from 'react-native-config';

// import ClockIcon from '@plx_tuber/assets/icons/Clock.icon';
import EmailIcon from '@plx_tuber/assets/icons/Email.icon';
import LightIcon from '@plx_tuber/assets/icons/Light.icon';
import PlayIcon from '@plx_tuber/assets/icons/Play.icon';
import PrivacyIcon from '@plx_tuber/assets/icons/Privacy.icon';
import StartIcon from '@plx_tuber/assets/icons/Star.icon';
import {Box, Typography} from '@plx_tuber/components';
import {colors, responsiveSize, spacing} from '@plx_tuber/theme';
import {withPlayerBar} from '@plx_tuber/components/shared';
import {useThemeStore} from '@plx_tuber/stores/theme';
import {SettingScreenProps} from './types';
import NavigatorMap from '@plx_tuber/navigations/NavigatorMap';

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
  // const [date, setDate] = useState<Date>();
  const insets = useSafeAreaInsets();
  const theme = useThemeStore(state => state.theme);
  const toggleDarkLightTheme = useThemeStore(
    state => state.toggleDarkLightTheme,
  );

  // const onChange = (_event: unknown, selectedDate?: Date) => {
  //   const currentDate = selectedDate;
  //   setDate(currentDate);
  // };

  const handlePressRateAndReview = () => Linking.openURL(rateLink);

  const handlePressEmail = () =>
    Linking.openURL(`mailto:${Config.FEEDBACK_EMAIL}`);

  const handlePressPrivacyPolicy = () => {
    navigation.navigate(NavigatorMap.Policy);
  };

  const settings = [
    {
      icon: <PlayIcon color={theme.primary} />,
      title: 'Stream quality',
      status: 'Normal',
    },
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

      {/* <Box
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
      </Box> */}
    </ScrollView>
  );
};

export default withPlayerBar(Settings);
