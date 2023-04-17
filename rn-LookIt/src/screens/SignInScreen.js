import { Image, StyleSheet, View, Keyboard, Alert } from 'react-native';
import Input, {
  KeyboardTypes,
  ReturnKeyTypes,
  IconNames,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView.js';
import { useRef, useEffect, useState } from 'react';
import Button from '../components/Button';
import { signIn } from '../api/auth';
import PropTypes from 'prop-types';
import { useUserContext } from '../contexts/UserContext';

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
          title={'이메일'}
          placeholder="your@email.com"
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          onChangeText={(email) => setEmail(email.trim())}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          iconName={IconNames.EMAIL}
        ></Input>
        <Input
          ref={passwordRef}
          title={'비밀번호'}
          placeholder="비밀번호"
          returnKeyType={ReturnKeyTypes.DONE}
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
          iconName={IconNames.PASSWORD}
        ></Input>
        <View style={styles.buttonContainer}>
          <Button
            title={'로그인'}
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
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
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
