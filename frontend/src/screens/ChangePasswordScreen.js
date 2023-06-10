import { Keyboard, StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useEffect, useState } from 'react';
import Button, { ButtonTypes } from '../components/buttons/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { idUniqueCheck, newPasswordPost, signUp } from '../api/auth';
import TextButton from '../components/TextButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PRIMARY, WHITE } from '../colors';
import Toast from 'react-native-toast-message';
const ChangePasswordScreen = ({ route }) => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets(); //화면 위아래 겹치거나 잘리는 경우 방지를 위한 상태변수
  const { email } = route.params;
  const [password, setPassword] = useState(''); //이메일 저장
  const [passwordConfirm, setPasswordConfirm] = useState(''); //인증코드 저장

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true); //입력 덜 된채로 버튼 클릭 방지

  useEffect(() => {
    setDisabled(!password || !passwordConfirm);
  }, [password, passwordConfirm]);

  const onSubmit = async () => {
    if (password != passwordConfirm) {
      Alert.alert(
        '비밀번호 변경 실패',
        '비밀번호와 비밀번호 확인이 \n일치하지 않습니다.',
        [
          {
            text: '확인',
            style: 'default',
            onPress: () => setIsLoading(false),
          },
        ]
      );
    } else {
      console.log('email:' + email + '\npassword:' + password);
      if (!isLoading) {
        try {
          setIsLoading(true);
          Keyboard.dismiss();

          const response = await newPasswordPost(email, password);
          console.log(response);

          setIsLoading(false);
          if (response.data) {
            newPasswordPost(email, password);
            Toast.show({
              type: 'success',
              text1: '성공적으로 비밀번호가 변경되었습니다.',
              position: 'bottom',
            });

            navigation.navigate('SignIn');
          } else {
            console.log(response.data);
            throw new Error(
              '비밀번호 변경 실패: 서버로부터 잘못된 응답을 받았습니다.'
            );
          }
        } catch (error) {
          console.log(error.message);
          //console.log(error.response);
          Alert.alert('비밀번호 변경 실패', '비밀번호 변경이 실패했습니다.', [
            {
              text: '확인',
              style: 'default',
              onPress: () => setIsLoading(false),
            },
          ]);
        }
      }
    }
    //다음 버튼 클릭시 호출되는 함수
    Keyboard.dismiss();
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
      >
        <View style={styles.rowContainer}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="변경할 비밀번호"
              value={password}
              secureTextEntry
              onChangeText={(password) => setPassword(password.trim())}
              returnKeyType={ReturnKeyTypes.NEXT}
              KeyboardType={KeyboardTypes.DEFAULT}
            ></Input>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={{ flex: 4 }}>
            <Input
              placeholder="변경할 비밀번호 확인"
              value={passwordConfirm}
              secureTextEntry
              onChangeText={(passwordConfirm) =>
                setPasswordConfirm(passwordConfirm.trim())
              }
              returnKeyType={ReturnKeyTypes.NEXT}
              KeyboardType={KeyboardTypes.DEFAULT}
            ></Input>
          </View>
        </View>
      </View>
      <View
        style={
          (styles.buttonContainer,
          { height: 48, width: '100%', paddingHorizontal: 20 })
        }
      >
        <Button
          title={'변경 완료'}
          onPress={onSubmit}
          disabled={disabled}
          buttonType={ButtonTypes.PRIMARY}
        ></Button>
      </View>
      <View style={{ paddingBottom: 34 }}></View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
    width: '100%',
  },
  buttonContainer: {
    justifyContent: 'center',
    //alignSelf: 'flex-end',
  },

  idCheck: {
    paddingRight: 20,
    paddingBottom: 8,
    justifyContent: 'flex-end',
  },
});

export default ChangePasswordScreen;
