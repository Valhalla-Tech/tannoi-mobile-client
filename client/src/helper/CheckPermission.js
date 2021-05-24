import { Platform, PermissionsAndroid } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

export default CheckPermission = async () => {
  if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
    return Promise.resolve(true);
  }

  try {
    if (Platform.OS === 'ios') {
      let requestIosMic = await request(PERMISSIONS.IOS.MICROPHONE)
      
      if (requestIosMic) {
        return true;
      }
    } else {
      let result;
      result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'Tannoi needs access to your microphone to use voice feature.',
        },
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error('failed getting permission, result:', result);
    return false;
  }
};
