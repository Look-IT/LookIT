//카메라 스크린. 네컷 사진 촬영용 카메라가 들어갈 곳.

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CameraScreen = ({ route }) => {
  const navigation = useNavigation();
  const { landmarkId } = route.params;

  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const width = Dimensions.get('window').width;
  const height = width * (4 / 3);

  useEffect(() => {
    //이미지 개수 바로바로 카운팅해서, 4컷 촬영 시 바로 넘어감.
    console.log(image.length);
    if (image.length >= 8) {
      navigation.navigate('FourCutFrameScreen', { image, landmarkId });

      console.log(image);
      console.log('landmarkId:' + landmarkId);
    }
  }, [image]);

  const takePicture = async () => {
    if (camera && !isLoading) {
      setIsLoading(true);
      const data = await camera.takePictureAsync(null);
      const id = Date.now().toString();
      const newImage = [{ id: id, data: data }, ...image];
      setImage(newImage);
      setIsLoading(false);
    }
  };

  const toggleCamera = () => {
    if (type === CameraType.back) {
      setType(CameraType.front);
    } else {
      setType(CameraType.back);
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
      <View style={styles.buttonContainer}>
        <Pressable onPress={takePicture}>
          <View style={styles.shotButton}>
            <MaterialCommunityIcons
              name="camera"
              size={48}
              color={WHITE}
            ></MaterialCommunityIcons>
          </View>
        </Pressable>
        <Pressable style={styles.toggleButton} onPress={toggleCamera}>
          <MaterialCommunityIcons
            name="camera-flip-outline"
            size={48}
            color={WHITE}
          ></MaterialCommunityIcons>
        </Pressable>
      </View>
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 36,

    height: 48,
    width: '100%',
  },
  shotButton: {
    width: 48,
    height: 48,
  },
  toggleButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    right: 20,
    width: 48,
    height: 48,
  },
});

export default CameraScreen;
