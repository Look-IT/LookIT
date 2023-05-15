//사진 합성용 테스트 스크린

import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { BLACK, WHITE } from '../colors';
import ViewShot from 'react-native-view-shot';
import { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
const FourPictureEditScreen = ({ route }) => {
  const { image } = route.params;
  const ref = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    // on mount

    setTimeout(() => {
      ref.current.capture().then((uri) => {
        console.log('do something with ', uri);
        navigation.navigate('FourCutFinalScreen', { uri });
      });
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Collection</Text>
      <ViewShot
        style={styles.basicFrame}
        ref={ref}
        options={{ fileName: 'CapturedFourCut', format: 'jpg', quality: 0.9 }}
      >
        <View style={[styles.basicFrame, { backgroundColor: WHITE }]}>
          <ImageBackground
            style={styles.basicFrame}
            source={require('../../assets/Default_Frame.png')}
          >
            <Image
              style={[styles.fourPicture, { bottom: 51, left: 30 }]}
              source={{ uri: image[1].data.uri }}
            ></Image>

            <Image
              style={[styles.fourPicture, { top: 206, left: 30 }]}
              source={{ uri: image[0].data.uri }}
            ></Image>

            <Image
              style={[styles.fourPicture, { top: 55, right: 33 }]}
              source={{ uri: image[2].data.uri }}
            ></Image>

            <Image
              style={[styles.fourPicture, { bottom: 201, right: 33 }]}
              source={{ uri: image[3].data.uri }}
            ></Image>
          </ImageBackground>
        </View>
      </ViewShot>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  basicFrame: {
    width: 600,
    height: 888,
    backgroundColor: WHITE,
  },

  fourPicture: {
    width: 255,
    height: 303,
    position: 'absolute',
    backgroundColor: WHITE,
  },
});

export default FourPictureEditScreen;
