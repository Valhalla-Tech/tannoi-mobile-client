import React, { useState } from 'react';
import { View, Text, Platform, PermissionsAndroid } from 'react-native';
import styles from './styles';
import { Button } from '../../elements';
import CheckPermission from '../../../helper/CheckPermission';

const AppPermissionForm = (props) => {
  const { onSubmit } = props;

  const [permitted, setPermitted] = useState(false);

  return (
    <View style={styles.rootStyle}>
      <View>
        <Text style={styles.titleTextStyle}>App Permissions</Text>
        <Text style={styles.normalTextStyle}>
          To use the app, TannOi will need your permissions to access your
          microphone.
        </Text>
        <Button
          customStyle={{
            ...styles.accessButtonStyle,
            borderColor: permitted ? '#7817FF' : '#E3E6EB',
            color: permitted ? '#7817FF' : '#73798C',
          }}
          name="Access Microphone"
          onPress={async () => {
            let askPermission = await CheckPermission();
            if (askPermission) {
              setPermitted(true);
            }
          }}
          disabled={permitted}
        />
      </View>
      {permitted && <Button name="Next" customStyle={styles.nextButtonStyle} onPress={() => onSubmit()} />}
    </View>
  );
};

export default AppPermissionForm;
