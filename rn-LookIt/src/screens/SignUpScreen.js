//회원가입 화면

import { Keyboard, StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useEffect, useState } from 'react';
import Button, { ButtonTypes } from '../components/buttons/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { idUniqueCheck, signUp } from '../api/auth';
import TextButton from '../components/TextButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets(); //화면 위아래 겹치거나 잘리는 경우 방지를 위한 상태변수

  const [tagId, setTagId] = useState(''); //아이디 저장
  const [email, setEmail] = useState(''); //이메일 저장
  const [password, setPassword] = useState(''); //패스워드 저장
  const [nickName, setNickName] = useState(''); //닉네임 저장
  const [idConfirm, setIdConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true); //입력 덜 된채로 버튼 클릭 방지

  useEffect(() => {
    setDisabled(!email || !password || !tagId || !nickName || !idConfirm);
  }, [email, password, tagId, nickName, idConfirm]);

  const onSubmit = async () => {
    //회원가입 버튼 클릭시 호출되는 함수
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      try {
        setIsLoading(true);
        console.log(tagId, email, password, nickName);

        const response = await signUp(
          'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/member/join',
          tagId,
          email,
          password,
          nickName
        );
        console.log(response.data);
        setIsLoading(false);
        if (response.data) {
          navigation.navigate('SignIn');
        } else {
          throw new Error(
            '회원가입 실패: 서버로부터 잘못된 응답을 받았습니다.'
          );
        }
      } catch (error) {
        console.log(error);

        Alert.alert(
          '회원가입 실패',
          '이메일 형식과\n비밀번호 규칙을 체크해주세요.',
          [
            {
              text: '확인',
              style: 'default',
              onPress: () => setIsLoading(false),
            },
          ]
        );
      }
    }
  };

  const onIdConfirm = () => {
    //아이디 중복 확인 버튼 클릭시 호출되는 함수

    idUniqueCheck(tagId, setIdConfirm, setIsLoading, isLoading);
    console.log(idConfirm);
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 4 }}>
            <Input
              title={'아이디'}
              placeholder="아이디를 입력해주세요."
              value={tagId}
              onChangeText={(tagId) => setTagId(tagId.trim())}
              returnKeyType={ReturnKeyTypes.NEXT}
              KeyboardType={KeyboardTypes.DEFAULT}
            ></Input>
          </View>

          <View style={styles.idCheck}>
            <View style={(styles.buttonContainer, { height: 36 })}>
              <TextButton
                title={'중복확인'}
                onPress={onIdConfirm}
                buttonType={ButtonTypes.TRANSPARENT}
              ></TextButton>
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: 30 }}></View>
        <Input
          title={'이메일'}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          returnKeyType={ReturnKeyTypes.NEXT}
          KeyboardType={KeyboardTypes.EMAIL}
        ></Input>
        <View style={{ paddingBottom: 30 }}></View>
        <Input
          title={'비밀번호'}
          placeholder="8~30자리의 알파벳, 숫자, 특수문자."
          value={password}
          secureTextEntry
          onChangeText={(password) => setPassword(password.trim())}
          returnKeyType={ReturnKeyTypes.NEXT}
          KeyboardType={KeyboardTypes.DEFAULT}
        ></Input>
        <View style={{ paddingBottom: 30 }}></View>
        <Input
          title={'닉네임'}
          placeholder="닉네임을 입력해주세요."
          value={nickName}
          onChangeText={(nickName) => setNickName(nickName.trim())}
          returnKeyType={ReturnKeyTypes.DONE}
          KeyboardType={KeyboardTypes.DEFAULT}
        ></Input>
        <View style={{ paddingBottom: 60 }}></View>
      </View>
      <View
        style={
          (styles.buttonContainer,
          { height: 48, width: '100%', paddingHorizontal: 20 })
        }
      >
        <Button
          title={'회원가입'}
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
  buttonContainer: {
    justifyContent: 'center',
    //alignSelf: 'flex-end',
  },

  idCheck: {
    flex: 1,
    paddingRight: 20,
    paddingBottom: 8,
    justifyContent: 'flex-end',
  },
});

export default SignUpScreen;
