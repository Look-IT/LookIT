import { Image, StyleSheet, View, Keyboard, Alert } from 'react-native';
import Input, { KeyboardTypes, ReturnKeyTypes } from '../components/Input';
import SafeInputView from '../components/SafeInputView.js';
import { useRef, useEffect, useState } from 'react';
import Button, { ButtonTypes } from '../components/Button';
import { signIn } from '../api/auth';
import PropTypes from 'prop-types';
import { useUserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);

  const { setUser } = useUserContext();
  const onSubmit = async () => {
    if (!isLoading && !disabled) {
      try {
        setIsLoading(true);
        Keyboard.dismiss();
        const data = await signIn(email, password);
        console.log(data);
        setIsLoading(false);
        setUser(data);
      } catch (error) {
        Alert.alert('로그인 실패', error, [
          {
            text: '확인',
            style: 'default',
            onPress: () => setIsLoading(false),
          },
        ]);
      }
    }
  };

  const navigation = useNavigation();

  const onSignUp = () => {
    navigation.navigate('SignUp');
    console.log('heelo');
  };
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  return (
    <SafeInputView>
      <View style={styles.container}>
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

        <View style={[styles.buttonContainer, { marginTop: 0 }]}>
          <Button
            title={'회원가입'}
            onPress={onSignUp}
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

    paddingHorizontal: 10,
  },
});

export default SignInScreen;
