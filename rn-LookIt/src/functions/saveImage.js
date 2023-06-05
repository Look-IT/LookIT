import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  PERMISSIONS,
  checkMultiple,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

export const saveImageToGallery = async (imageUri) => {
  try {
    await checkMultiple([PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
    const timestamp = new Date().getTime();
    const response = await RNFetchBlob.config({
      path: RNFetchBlob.fs.dirs.DownloadDir + `/myFourCut_${timestamp}.jpg`,
    }).fetch('GET', imageUri);

    const imagePath = response.path();
    await saveImageToMediaLibrary(imagePath);

    console.log('이미지가 갤러리에 저장되었습니다.');
  } catch (error) {
    console.log('이미지 저장 중에 오류가 발생했습니다.', error);
  }
};

const saveImageToMediaLibrary = async (imagePath) => {
  if (Platform.OS === 'android') {
    await RNFetchBlob.fs.scanFile([{ path: imagePath, mime: 'image/jpeg' }]);
  } else if (Platform.OS === 'ios') {
    await RNFetchBlob.fs.asset(imagePath);
  }
};
