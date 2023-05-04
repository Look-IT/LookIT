//카메라 스크린. 네컷 사진 촬영용 카메라가 들어갈 곳.

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const navigation = useNavigation();

  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState([]);

  const width = Dimensions.get('window').width;
  const height = width * (4 / 3);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const id = Date.now().toString();
      const newImage = [{ id, data }, ...image];
      setImage(newImage);

      if (image.length >= 4) {
        navigation.navigate('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={[styles.camera, { width: width, height: height }]}
        type={type}
        ratio="4:3"
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
    backgroundColor: BLACK,
  },
  camera: {
    backgroundColror: BLACK,
  },
  shotButton: {
    width: 48,
    height: 48,
    backgroundColor: PRIMARY.DEFAULT,
  },
});

export default CameraScreen;
