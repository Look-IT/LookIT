//카메라 스크린. 네컷 사진 촬영용 카메라가 들어갈 곳.

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const navigation = useNavigation();

  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState([]);

  const width = Dimensions.get('window').width;
  const height = width * (4 / 3);

  useEffect(() => {
    //이미지 개수 바로바로 카운팅해서, 4컷 촬영 시 바로 넘어감.
    console.log(image.length);
    if (image.length >= 4) {
      navigation.navigate('FourPictureEditScreen', { image });

      console.log(image);
    }
  }, [image]);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const id = Date.now().toString();
      const newImage = [{ id: id, data: data }, ...image];
      setImage(newImage);
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
