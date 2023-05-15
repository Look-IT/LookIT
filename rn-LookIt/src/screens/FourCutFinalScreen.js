//완성된 추억네컷 스크린

import { Image, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
import { useEffect } from 'react';
import { BLACK } from '../colors';
import Button, { ButtonTypes } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
const FourCutFinalScreen = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(route.params.uri);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>완성된 추억네컷을</Text>
        <Text style={styles.textStyle}>확인해 보세요.</Text>
      </View>

      <Image
        style={{ width: 256, height: 379 }}
        source={{ uri: route.params.uri }}
      ></Image>
      <View style={styles.buttonContainer}>
        <Button
          title="완료"
          onPress={() => {
            navigation.navigate('ContentTab');
          }}
          buttonType={ButtonTypes.PRIMARY}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 16,
  },
  textContainer: {
    height: 64,
    width: '100%',
    marginBottom: 48,
    marginTop: 24,
    alignItems: 'flex-start',
  },

  textStyle: { fontSize: 24, fontWeight: 400 },

  buttonContainer: {
    height: 48,
    width: '100%',
    position: 'absolute',
    bottom: 34,
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
