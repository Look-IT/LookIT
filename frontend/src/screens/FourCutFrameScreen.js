//완성된 추억네컷 스크린

import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { WHITE } from '../colors';
import { useEffect, useState } from 'react';
import { BLACK } from '../colors';
import Button, { ButtonTypes } from '../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { fourCutFrameGet } from '../api/fourCutApi';
import Toast from 'react-native-toast-message';
import { useUserContext } from '../contexts/UserContext';

const FourCutFrameScreen = ({ route }) => {
  const { image, landmarkId } = route.params;
  const { user } = useUserContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); //로그인 클릭 시, 서버와 통신하는 동안 중복 요청을 방지하는 상태 변수
  const [frameUri, setFrameUri] = useState('default');

  useEffect(() => {
    getFrame();
  }, []);

  const getFrame = async () => {
    //네컷 사진 프레임 얻어오는 함수
    if (!isLoading) {
      try {
        setIsLoading(true);

        const response = await fourCutFrameGet(landmarkId);

        setIsLoading(false);
        if (response.data) {
          setFrameUri(response.data);
          console.log('frameUri : ' + frameUri);
        } else {
          console.log(response.data);
          throw new Error(
            '프레임 조회 실패: 서버로부터 잘못된 응답을 받았습니다.'
          );
        }
      } catch (error) {
        console.log(error.message);

        Alert.alert('프레임 조회 실패', '프레임 조회가 실패했습니다.', [
          {
            text: '확인',
            style: 'default',
            onPress: () => setIsLoading(false),
          },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>프레임을</Text>
        <Text style={styles.textStyle}>확인해 주세요.</Text>
      </View>

      <Image
        style={{ width: 200, height: 296 }}
        source={{ uri: frameUri }}
      ></Image>
      <View style={styles.buttonContainer}>
        <Button
          title="다음"
          onPress={() => {
            navigation.navigate('FourCutSellectScreen', {
              image,
              frameUri,
              landmarkId,
            });
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

export default FourCutFrameScreen;
