//사진 합성용 테스트 스크린

import { Image, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
import ViewShot from 'react-native-view-shot';
import { useRef } from 'react';

const FourPictureEditScreen = () => {
  const ref = useRef();
  return (
    <View style={styles.container}>
      <Text>Collection</Text>
      <ViewShot
        ref={ref}
        options={{ fileName: 'CapturedFourCut', format: 'jpg', quality: 1.0 }}
      >
        <View style={styles.basicFrame}>
          <Image
            style={styles.basicFrame}
            source={require('../../assets/Default_Frame.png')}
          ></Image>
          <Image
            style={[styles.fourPicture, { bottom: 17, left: 10 }]}
            source={require('../../assets/main.png')}
          ></Image>
          <Image
            style={[styles.fourPicture, { top: 69, left: 10 }]}
            source={require('../../assets/main.png')}
          ></Image>
          <Image
            style={[styles.fourPicture, { top: 18, right: 11 }]}
            source={require('../../assets/main.png')}
          ></Image>
          <Image
            style={[styles.fourPicture, { bottom: 67, right: 11 }]}
            source={require('../../assets/main.png')}
          ></Image>
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
    backgroundColor: WHITE,
  },

  basicFrame: {
    width: 200,
    height: 296,
  },

  fourPicture: {
    width: 85,
    height: 101,
    position: 'absolute',
  },
});

export default FourPictureEditScreen;
