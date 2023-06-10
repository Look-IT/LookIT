import { Keyboard, StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import { useEffect, useState } from 'react';
import Button, { ButtonTypes } from '../components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { emailConfirmPost, idUniqueCheck, signUp } from '../api/auth';
import TextButton from '../components/TextButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PRIMARY, WHITE } from '../colors';

const PasswordFindScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets(); //화면 위아래 겹치거나 잘리는 경우 방지를 위한 상태변수

  const [email, setEmail] = useState(''); //이메일 저장
  const [confirmCode, setConfirmCode] = useState(''); //인증코드 저장
  const [serverConfirmCode, setServerConfirmCode] = useState(''); //서버에서 받은 인증코드

  const [emailConfirm, setEmailConfirm] = useState(false); //이메일 인증 여부

  const [codeConfirm, setCodeConfirm] = useState(false); //인증코드 인증 여부

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true); //입력 덜 된채로 버튼 클릭 방지

  useEffect(() => {
    setDisabled(!email || !confirmCode || !emailConfirm || !codeConfirm);
  }, [email, confirmCode, emailConfirm, codeConfirm]);

  const onSubmit = () => {
    //다음 버튼 클릭시 호출되는 함수
    Keyboard.dismiss();
    navigation.navigate('NewPassword', { email });
  };

  const onEmailConfirm = async () => {
    console.log('인증 시작');
    //이메일 인증 버튼 클릭 시 호출되는 함수
    if (!isLoading) {
      try {
        setIsLoading(true);
        Keyboard.dismiss();

        const response = await emailConfirmPost(email);
        console.log(response);

        setIsLoading(false);
        if (
          response.data &&
          response.data != '해당 이메일로 가입된 유저가 없습니다.'
        ) {
          setEmailConfirm(true);
          setServerConfirmCode(response.data);
          Alert.alert('인증 코드', '이메일로 인증 코드가 발송되었습니다.', [
            {
              text: '확인',
              style: 'default',
              onPress: () => setIsLoading(false),
            },
          ]);
          console.log('인증코드 : ' + response.data);
        } else {
          console.log(response.data);
          throw new Error('이메일 인증 실패: 이메일을 확인해주세요.');
        }
      } catch (error) {
        console.log(error.message);
        //console.log(error.response);
        Alert.alert('이메일 인증 실패', '이메일 인증이 실패했습니다.', [
          {
            text: '확인',
            style: 'default',
            onPress: () => setIsLoading(false),
          },
        ]);
      }
    }
  };

  const onCodeConfirm = () => {
    //인증하기 버튼 클릭시 호출되는 함수
    if (confirmCode == serverConfirmCode) {
      Alert.alert('이메일 인증', '인증되었습니다.', [
        {
          text: '확인',
          style: 'default',
          onPress: () => setIsLoading(false),
        },
      ]);
      setCodeConfirm(true);
    } else {
      Alert.alert('인증 실패', '인증 코드를 확인해주세요.', [
        {
          text: '확인',
          style: 'default',
          onPress: () => setIsLoading(false),
        },
      ]);
      setCodeConfirm(false);
    }

    console.log(codeConfirm);
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
      >
        <View style={[styles.rowContainer]}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="이메일을 입력해주세요."
              value={email}
              onChangeText={(email) => {
                setEmailConfirm(false);
                setEmail(email.trim());
              }}
              returnKeyType={ReturnKeyTypes.NEXT}
              KeyboardType={KeyboardTypes.DEFAULT}
            ></Input>
          </View>

          <View style={styles.idCheck}>
            <View style={(styles.buttonContainer, { height: 36, width: 92 })}>
              <TextButton
                title={'이메일 인증'}
                style={{ backgroundColor: PRIMARY.DEFAULT }}
                textStyle={{ color: WHITE }}
                onPress={onEmailConfirm}
                buttonType={ButtonTypes.TRANSPARENT}
              ></TextButton>
            </View>
          </View>
        </View>
        {emailConfirm ? (
          <View style={styles.rowContainer}>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="인증코드를 입력해주세요."
                value={confirmCode}
                onChangeText={(confirmCode) => {
                  setCodeConfirm(false);
                  setConfirmCode(confirmCode.trim());
                }}
                returnKeyType={ReturnKeyTypes.NEXT}
                KeyboardType={KeyboardTypes.DEFAULT}
              ></Input>
            </View>

            <View style={styles.idCheck}>
              <View style={(styles.buttonContainer, { height: 36, width: 92 })}>
                <TextButton
                  title={'인증하기'}
                  style={{ backgroundColor: PRIMARY.DEFAULT }}
                  textStyle={{ color: WHITE }}
                  onPress={onCodeConfirm}
                  buttonType={ButtonTypes.TRANSPARENT}
                ></TextButton>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View
        style={
          (styles.buttonContainer,
          { height: 48, width: '100%', paddingHorizontal: 20 })
        }
      >
        <Button
          title={'다음'}
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

export default PasswordFindScreen;
