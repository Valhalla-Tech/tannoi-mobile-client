import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Button } from '../../elements';

const CommunityRulesForm = (props) => {
  const { onSubmit } = props;

  const [agree, setAgree] = useState(false);
  const [ageVerification, setAgeVerification] = useState(false);

  return (
    <View style={styles.rootStyle}>
      <View>
        <Text style={styles.titleTextStyle}>Community Rules</Text>
        <View style={styles.rulesContainerStyle}>
          <Text style={styles.rulesTextStyle}>No Violence</Text>
          <Text style={styles.rulesDescriptionTextStyle}>
            We do not condone violence of any kind.
          </Text>
        </View>
        <View style={styles.rulesContainerStyle}>
          <Text style={styles.rulesTextStyle}>No Abuse or Discrimination</Text>
          <Text style={styles.rulesDescriptionTextStyle}>
            We do not tolerate ANY discrimination.
          </Text>
        </View>
        <View style={styles.rulesContainerStyle}>
          <Text style={styles.rulesTextStyle}>Be Respectful</Text>
          <Text style={styles.rulesDescriptionTextStyle}>
            Don’t be a bully. Respect is at the core of our platform.
          </Text>
        </View>
        <View style={styles.rulesContainerStyle}>
          <Text style={styles.rulesTextStyle}>Be Real</Text>
          <Text style={styles.rulesDescriptionTextStyle}>
            This is a space for authentic discussions; refrain from spamming.
          </Text>
        </View>
      </View>
      <View>
        <Button
          customStyle={{
            ...styles.agreeButtonStyle,
            borderColor: ageVerification ? '#7817FF' : '#E3E6EB',
            color: ageVerification ? '#7817FF' : '#73798C',
          }}
          name="I Am at Least 18 Years Old"
          onPress={() => setAgeVerification((prevState) => !prevState)}
        />
        <Button
          customStyle={{
            ...styles.agreeButtonStyle,
            borderColor: agree ? '#7817FF' : '#E3E6EB',
            color: agree ? '#7817FF' : '#73798C',
          }}
          name="Agree to Guidelines"
          onPress={() => setAgree((prevState) => !prevState)}
        />
        {agree && (
          <Button
            name="Next"
            customStyle={styles.nextButtonStyle}
            onPress={() => onSubmit()}
          />
        )}
      </View>
    </View>
  );
};

export default CommunityRulesForm;
