import React, { useState } from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';
import { Button } from '../../elements';
import { Radio } from 'native-base';
import styles from './styles';

const TermsOfServiceForm = (props) => {
  const { showAgreeButton, onSubmit } = props;

  const [isAgreed, setIsAgreed] = useState(true);

  const openLink = () => {
    Linking.canOpenURL('https://www.tannoi.app/privacypolicy').then(
      (supported) => {
        if (supported) {
          Linking.openURL('https://www.tannoi.app/privacypolicy');
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      },
    );
  };

  const RadioButton = (text, selected, option) => (
    <View style={styles.radioButtonContainerStyle}>
      <Radio
        onPress={() => setIsAgreed(option)}
        selected={selected}
        style={styles.radioButtonStyle}
      />
      <Text style={styles.radioTextStyle}>{text()}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.rootStyle}>
        <View>
          <Text style={styles.titleTextStyle}>
            Consent to installation of the App
          </Text>
          <Text style={styles.normalTextStyle}>
            Under data protection laws, Tannoi are required to provide you with
            certain information about who we are, how we process your personal
            data and for what purposes, and your rights in relation to your
            personal data. This information is provided in {''}
            <Text onPress={openLink} style={styles.linkStyle}>
              https://www.tannoi.app/privacypolicy
            </Text>{' '}
            and it is important that you read that information. Before
            installation of this App, please indicate your consent to our
            processing of your personal data (including your name, contact
            details, financial and device information) as described in the
            policy.
          </Text>
          <Text style={styles.titleTextStyle}>
            How you can withdraw consent
          </Text>
          <Text style={{ ...styles.normalTextStyle, marginBottom: '8%' }}>
            Once you provide consent by selecting "YES", you may change your
            mind and withdraw consent at any time by contacting us at
            contact@tannoi.app but that will not affect the lawfulness of any
            processing carried out before you withdraw your consent.
          </Text>
          {RadioButton(
            () => (
              <Text style={styles.radioTextStyle}>
                <Text style={styles.radioTextStyleBold}>YES</Text>, I consent to
                the installation of the App for the purposes set out in our
                Privacy Policy.
              </Text>
            ),
            isAgreed ? true : false,
            true,
          )}
          {RadioButton(
            () => (
              <Text style={styles.radioTextStyle}>
                <Text style={styles.radioTextStyleBold}>NO</Text>, I do not
                consent to the installation of the App
              </Text>
            ),
            !isAgreed ? true : false,
            false,
          )}
        </View>
        <View>
          <Button
            name="Next"
            onPress={() => onSubmit(isAgreed)}
            customStyle={styles.nextButtonStyle}
          />
          <Text></Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TermsOfServiceForm;
