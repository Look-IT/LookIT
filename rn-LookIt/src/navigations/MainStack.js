//스크린들을 쌓아두는 stack

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BLACK, PRIMARY, WHITE } from '../colors';
import HeaderLeftButton from '../components/HeaderLeftButton';
import ContentTab from './ContentTab';
import { MainRoutes } from './routes';
import CameraScreen from '../screens/CameraScreen';
import FourPictureEditScreen from '../screens/FourPictureEditScreen';
import FourCutFinalScreen from '../screens/FourCutFinalScreen';

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
        headerTintColor: BLACK,
        headerTitleStyle: {
          fontWeight: '400',
        },
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name={MainRoutes.CONTENT_TAB}
        component={ContentTab}
      ></Stack.Screen>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerLeft: HeaderLeftButton }}
      />
      <Stack.Screen
        name="FourPictureEditScreen"
        component={FourPictureEditScreen}
        options={{ headerLeft: HeaderLeftButton }}
      />
      <Stack.Screen
        name="FourCutFinalScreen"
        component={FourCutFinalScreen}
        options={{
          title: '추억네컷',
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
