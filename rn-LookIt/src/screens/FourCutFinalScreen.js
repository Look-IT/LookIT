//완성된 추억네컷 스크린

import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { WHITE } from '../colors';
import { useEffect, useState } from 'react';
import { BLACK } from '../colors';
import Button, { ButtonTypes } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { fourCutPost } from '../api/fourCutApi';
import Toast from 'react-native-toast-message';
import { useUserContext } from '../contexts/UserContext';
import FriendTagButton from '../components/FriendTagButton';

const FourCutFinalScreen = ({ route }) => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); //로그인 클릭 시, 서버와 통신하는 동안 중복 요청을 방지하는 상태 변수
  const { uri, taggedFriend } = route.params;

  useEffect(() => {
    console.log(uri);
    console.log('tag:' + taggedFriend);
  }, []);

  const onSubmit = async () => {
    //네컷 사진 완료 버튼 클릭 시 호출되는 함수
    if (!isLoading) {
      try {
        setIsLoading(true);

        const response = await fourCutPost(user, 1, uri);

        setIsLoading(false);
        if (response.data) {
          navigation.navigate('ContentTab');
          Toast.show({
            type: 'success',
            text1: '추억네컷이 저장되었습니다.',
            position: 'bottom',
          });
        } else {
          console.log(response.data);
          throw new Error(
            '사진 생성 실패: 서버로부터 잘못된 응답을 받았습니다.'
          );
        }
      } catch (error) {
        console.log(error.message);
        //console.log(error.response);
        Alert.alert('사진생성 실패', '사진생성이 실패했습니다.', [
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
        <Text style={styles.textStyle}>완성된 추억네컷을</Text>
        <Text style={styles.textStyle}>확인해 보세요.</Text>
      </View>
      <View>
        <Image
          style={{ width: 256, height: 379 }}
          source={{ uri: uri }}
        ></Image>
        <FriendTagButton
          style={{ position: 'absolute', bottom: 8, right: 8 }}
          tagFriend={taggedFriend}
        ></FriendTagButton>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="완료"
          onPress={() => {
            onSubmit();
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
