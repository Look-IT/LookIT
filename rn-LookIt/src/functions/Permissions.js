import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from "react-native-permissions"
import { Platform } from "react-native";
// import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import VIForegroundService from "@voximplant/react-native-foreground-service";

export const requestPermissions = async () => {
  if (Platform.OS !== 'android') return;

  const statuses = await checkMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  ]);

  const deniedPermissions = Object.entries(statuses)
    .filter(([_, status]) => status === RESULTS.DENIED)
    .map(([permission, _]) => permission);

  if (deniedPermissions.length > 0) {
    const requestStatues = await requestMultiple(deniedPermissions);
    console.log(requestStatues);
  }

  const channelConfig = {
      id: 'default',
      name: 'default',
      description: '추억일지 기록 관련 알림 채널',
      importance: 4,
      enableVibration: false
    };
    await VIForegroundService.getInstance().createNotificationChannel(channelConfig);
}