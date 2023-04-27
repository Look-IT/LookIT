//스크린들을 쌓아두는 stack

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PRIMARY, WHITE } from '../colors';
import HeaderLeftButton from '../components/HeaderLeftButton';
import ContentTab from './ContentTab';
import { MainRoutes } from './routes';

//로그인 후 화면에 표시되는 스크린 stack

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainRoutes.CONTENT_TAB}
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerShown: false,
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name={MainRoutes.CONTENT_TAB}
        component={ContentTab}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStack;
