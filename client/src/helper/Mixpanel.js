import { Mixpanel } from 'mixpanel-react-native';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const trackWithMixPanel = async (title, obj) => {
    const mixpanel = await Mixpanel.init("ed9818be4179a2486e41556180a65495");
    return mixpanel.track(title, {
        apiLevel: Platform.OS === 'android' ? await DeviceInfo.getApiLevel() : null,
        ...obj,
    });
}