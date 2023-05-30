//스크린들을 쌓아두는 stack

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BLACK, PRIMARY, WHITE } from '../colors';
import HeaderLeftButton from '../components/HeaderLeftButton';
import ContentTab from './ContentTab';
import { MainRoutes } from './routes';
import CameraScreen from '../screens/CameraScreen';
import FourPictureEditScreen from '../screens/FourPictureEditScreen';
import FourCutFinalScreen from '../screens/FourCutFinalScreen';
import MemoriesCreateScreen from '../screens/MemoriesCreateScreen';
import PictureUploadModal from '../components/modals/PictureUploadModal';
import FourCutSellectScreen from '../screens/FourCutSellectScreen';
import FriendAddScreen from '../screens/FriendAddScreen';
import FourCutFrameScreen from '../screens/FourCutFrameScreen';
import FourCutTagScreen from '../screens/FourCutTagScreen';
import MemoriesInfoTagScreen from '../screens/MemoriesInfoTagScreen';

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
      <Stack.Screen
        name="FourCutFrameScreen"
        component={FourCutFrameScreen}
        options={{
          title: '추억네컷',
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="FourCutTagScreen"
        component={FourCutTagScreen}
        options={{
          title: '추억네컷',
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="FourCutSellectScreen"
        component={FourCutSellectScreen}
        options={{
          title: '추억네컷',
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="FriendAddScreen"
        component={FriendAddScreen}
        options={{
          title: '친구 추가',
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MemoriesCreateScreen"
        component={MemoriesCreateScreen}
        options={{
          title: '추억일지 생성',
        }}
      />
      <Stack.Screen
        name="MemoriesInfoTagScreen"
        component={MemoriesInfoTagScreen}
        options={{ 
          title: '추억일지 생성',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
