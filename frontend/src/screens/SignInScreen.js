//로그인 화면

import { Image, StyleSheet, View, Keyboard, Alert, Text } from 'react-native';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import SafeInputView from '../components/SafeInputView.js';
import { useRef, useEffect, useState } from 'react';
import Button, { ButtonTypes } from '../components/buttons/Button';
import { signIn } from '../api/auth';
import PropTypes from 'prop-types';
import { useUserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { storeToken } from '../api/apiClient';
import { PRIMARY } from '../colors';

const SignInScreen = () => {
  const [email, setEmail] = useState(''); //이메일 상태 변수
  const [password, setPassword] = useState(''); // 비밀번호 상태 변수
  const [isLoading, setIsLoading] = useState(false); //로그인 클릭 시, 서버와 통신하는 동안 중복 요청을 방지하는 상태 변수
  const passwordRef = useRef(null); //아이디 창에서 엔터 누를 시 자동으로 비밀번호 입력창으로 넘어가기 위한 상태 변수

  const { setUser, setUserId } = useUserContext();
  const insets = useSafeAreaInsets();

  const onSubmit = async () => {
    //로그인 버튼 클릭 시 호출되는 함수
    if (!isLoading && !disabled) {
      setIsLoading(true);
      Keyboard.dismiss();

      signIn(email, password)
        .then((response) => {
          setIsLoading(false);
          setUser(response);
          storeToken(response);
        })
        .catch((error) => {
          console.log(error.message);

          Alert.alert('로그인 실패', '로그인을 실패하였습니다.', [
            {
              text: '확인',
              style: 'default',
              onPress: () => setIsLoading(false),
            },
          ]);
        });
    }
  };

  const navigation = useNavigation();

  const onSignUp = () => {
    //회원가입 버튼 클릭시 호출되는 함수
    navigation.navigate('SignUp');
    console.log('heelo');
  };
  const [disabled, setDisabled] = useState(true);

  const onFindPassword = () => {
    //회원가입 버튼 클릭시 호출되는 함수
    navigation.navigate('PasswordFind');
    console.log('passwordFind');
  };

  useEffect(() => {
    //로그인 버튼 활성화에 관여하는 상태변수
    setDisabled(!email || !password);
  }, [email, password]);

  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={[styles.container, { width: '100%' }]}>
          <Image
            // eslint-disable-next-line no-undef
            source={require('../../assets/main.png')}
            style={styles.image}
          ></Image>

          <Input
            title={''}
            placeholder="이메일"
            keyboardType={KeyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            onChangeText={(email) => setEmail(email.trim())}
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            //iconName={IconNames.EMAIL}
          ></Input>
          <Input
            ref={passwordRef}
            title={''}
            placeholder="비밀번호"
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password.trim())}
            //iconName={IconNames.PASSWORD}
          ></Input>
          <View style={[styles.buttonContainer, { marginTop: 30 }]}>
            <Button
              title={'로그인'}
              onPress={onSubmit}
              disabled={disabled}
              isLoading={isLoading}
            ></Button>
          </View>

          <View
            style={[styles.buttonContainer, { marginTop: 0, marginBottom: 32 }]}
          >
            <Button
              title={'회원가입'}
              onPress={onSignUp}
              buttonType={ButtonTypes.TRANSPARENT}
            ></Button>
          </View>
        </View>
        <View
          style={[
            styles.buttonContainer,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: PRIMARY[500],
            },
          ]}
        >
          <Text style={{ marginRight: 8, fontSize: 12 }}>
            비밀번호를 잊으셨나요?
          </Text>
          <Button
            title={'비밀번호 찾기'}
            onPress={onFindPassword}
            buttonType={ButtonTypes.TRANSPARENT}
          ></Button>
        </View>
      </View>
    </SafeInputView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
  },
  checkBox: {
    width: 48,
    height: 48,
  },
});

export default SignInScreen;
