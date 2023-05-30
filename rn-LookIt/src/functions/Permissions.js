import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from "react-native-permissions"
import { Platform } from "react-native";

export const requestPermissions = async () => {
  if (Platform.OS !== 'android') return;

  const statuses = await checkMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    PERMISSIONS.ANDROID.CAMERA,
  ]);

  const deniedPermissions = Object.entries(statuses)
    .filter(([_, status]) => status === RESULTS.DENIED)
    .map(([permission, _]) => permission);

  if (deniedPermissions.length > 0) {
    const requestStatues = await requestMultiple(deniedPermissions);
    console.log(requestStatues);
  }
}