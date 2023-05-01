//테스트 스크린

import { StyleSheet, Text, View, Alert } from 'react-native';
import { WHITE } from '../colors';
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Camera, CameraType } from 'expo-camera';

const TestScreen = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);

  const onGetPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (hasPermission === null || hasPermission === false) {
      Alert.alert('카메라 접근 권한', '카메라 접근 권한이 필요합니다.', [
        {
          text: '확인',
          onPress: () => {},
        },
      ]);
      return;
    }
    console.log(hasPermission);
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <View style={[styles.buttonContainer, { marginTop: 30 }]}>
        <Button title={'네컷 촬영'} onPress={onGetPermission}></Button>
      </View>
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
  buttonContainer: {
    width: '100%',
    height: 48,
    paddingHorizontal: 10,
  },
});

export default TestScreen;
