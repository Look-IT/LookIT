//사진 합성용 테스트 스크린

import { Image, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
import { useEffect } from 'react';
import { BLACK } from '../colors';
const FourCutFinalScreen = ({ route }) => {
  useEffect(() => {
    console.log(route.params.uri);
  }, []);

  return (
    <View style={styles.container}>
      <Text>FinalCut</Text>
      <Image
        style={{ width: 200, height: 296 }}
        source={{ uri: route.params.uri }}
      ></Image>
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
    width: 600,
    height: 888,
  },

  fourPicture: {
    width: 255,
    height: 303,
    position: 'absolute',
  },
});

export default FourCutFinalScreen;
