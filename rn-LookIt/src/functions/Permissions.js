import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from "react-native-permissions"
import { Platform } from "react-native";

export const requestMultiplePermissions = () => {
  
  if (Platform.OS === 'android') {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ]).then(response => {
      console.log('MULTIPLE REQUEST RESPONSE: ', response);
      return;
    });
  }
  else if (Platform.OS === 'ios') {
    console.log('IOS NOT');
    return;
  }
};

export const checkMultiplePermissions = () => {

  if (Platform.OS === 'android') {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ]).then(async response => {

      for (value of Object.values(response)) {
        switch (value) {
          case RESULTS.GRANTED:
            console.log(
              'The permission is granted'
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable'
            );
            await requestMultiplePermissions();
            break;
        }
      }
    })
    .catch(error => {
      console.log('PERMISSION ERROR : ', error);
    });
    
  } else if (Platform.OS === 'ios') {
    console.log('IOS NOT');
  }
};