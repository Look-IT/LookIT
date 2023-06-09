//스크린들을 쌓아두는 stack

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { WHITE } from '../colors';
import HeaderLeftButton from '../components/HeaderLeftButton.js';

//로그인 전 화면에 표시되는 스크린 stack

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerShown: false,
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: true,
          headerTitle: '회원가입',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
