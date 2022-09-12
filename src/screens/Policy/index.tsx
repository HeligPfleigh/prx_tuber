import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {SafeAreaView} from 'react-native-safe-area-context';

import {PolicyScreenProps} from './types';
import LeftArrowIcon from '@plx_tuber/assets/icons/LeftArrow.icon';
import {colors, spacing} from '@plx_tuber/theme';
import {Box} from '@plx_tuber/components';

const source = {
  html: `
<h3><strong>Privacy Policy</strong>:</h3>
<p>&ndash;&nbsp;<strong>Personal information:</strong>&nbsp;We do NOT collect any Personal Information about you. &ldquo;Personal Information&rdquo; means personally identifiable information, such as your name, email address, physical address, calendar entries, contact entries, files, photos, etc.</p>
<p>&ndash;&nbsp;<strong>Non-personal information:</strong>&nbsp;non-personal information about your use of our apps is collected and aggregated without being able to identify yourself specifically. &ldquo;Non-Personal Information&rdquo; means information that is of an anonymous nature, such as the type of mobile device you use, your mobile devices unique device ID, your mobile operating system, the length of a session when you use the app and potential crashes. We do not store this data.</p>
<p>&ndash;&nbsp;<strong>Face data:</strong>&nbsp;we do not collect or store face data in our apps.</p>
<p>&ndash;&nbsp;<strong>Security:</strong>&nbsp;We are very concerned about safeguarding the confidentiality of your information. We do not collect Personal Information, and we employ administrative, physical and electronic measures designed to protect your Non-Personal Information from unauthorized access and use.</p>
<p>&ndash;&nbsp;<strong>Your privacy:</strong>&nbsp;We do not store or retain any personal information that can be used to identify you (the end-user). No data specific to the end-user will be shared or sold to third parties. We have no interest in housing and storing users&rsquo; personal information or data.</p>
<p>&ndash;&nbsp;<strong>Crashlytics:</strong>&nbsp;We use Crashlytics to collect crash reports and anonymous statistical information. This helps us to fix bugs. If you do have a crash, then we may upload logging information to help diagnose the crash.</p>
<p>&ndash;&nbsp;<strong>Contact:</strong>&nbsp;If you have any questions or comments about this Privacy Policy or any other issues regarding our apps or services, please contact us at&nbsp;<a title="tanganstudio@yahoo.com" data-test-id="contact-card-email">tptechstudio@yahoo.com</a></p>
`,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing(2),
  },
});

const Policy: React.FC<PolicyScreenProps> = ({navigation}) => {
  const {width} = useWindowDimensions();

  const handleBack = () => navigation.goBack();

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Box flex={false} mb={2} mt={2.5}>
          <TouchableOpacity onPress={handleBack}>
            <LeftArrowIcon color={colors.black} />
          </TouchableOpacity>
        </Box>
        <RenderHTML contentWidth={width} source={source} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Policy;
