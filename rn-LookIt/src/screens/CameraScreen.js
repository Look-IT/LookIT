//카메라 스크린. 네컷 사진 촬영용 카메라가 들어갈 곳.

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio="1:1"
        ref={(ref) => setCamera(ref)}
      ></Camera>
      <Pressable onPress={takePicture}>
        <View style={styles.shotButton}></View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  camera: {
    width: '90%',
    height: 500,
    backgroundColor: BLACK,
  },
  shotButton: {
    width: 48,
    height: 48,
    backgroundColor: PRIMARY.DEFAULT,
  },
});

export default CameraScreen;
