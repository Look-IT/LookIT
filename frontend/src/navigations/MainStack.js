//스크린들을 쌓아두는 stack

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BLACK, DANGER, WHITE } from '../colors';
import HeaderLeftButton from '../components/HeaderLeftButton';
import ContentTab from './ContentTab';
import { MainRoutes } from './routes';
import CameraScreen from '../screens/CameraScreen';
import FourPictureEditScreen from '../screens/FourPictureEditScreen';
import FourCutFinalScreen from '../screens/FourCutFinalScreen';
import MemoriesCreateScreen from '../screens/MemoriesCreateScreen';
import FourCutSellectScreen from '../screens/FourCutSellectScreen';
import FriendAddScreen from '../screens/FriendAddScreen';
import FourCutFrameScreen from '../screens/FourCutFrameScreen';
import FourCutTagScreen from '../screens/FourCutTagScreen';
import MemoriesInfoTagScreen from '../screens/MemoriesInfoTagScreen';
import MemoriesViewScreen from '../screens/MemoriesViewScreen';
import MemoriesFriendTagScreen from '../screens/MemoriesFriendTagScreen';
import FriendMemoriesListScreen from '../screens/FriendMemoriesListScreen';
import HeaderLeftTitle from '../components/HeaderLeftTitle';
import IconBottomSheet from '../components/IconBottomSheet';
import { handleDeleteMemories } from '../functions/handleFunction';

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
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MemoriesInfoTagScreen"
        component={MemoriesInfoTagScreen}
        options={{ 
          title: '추억일지 생성',
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MemoriesFriendTagScreen"
        component={MemoriesFriendTagScreen}
        options={{ 
          title: '추억일지 생성',
          headerLeft: HeaderLeftButton,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MemoriesViewScreen"
        component={MemoriesViewScreen}
        options={({ route }) => ({ 
          title: '추억일지',
          // headerLeft: HeaderLeftButton,
          headerRight: (canGoBack) => (
            [
              <IconBottomSheet
                key="icon"
                canGoBack={canGoBack}
                SheetList={[
                  {
                    icon: require('../../assets/Icon_Delete.png'),
                    text: '추억일지 삭제',
                    handleFunction: () => handleDeleteMemories(route.params.memoryId),
                    color: DANGER['500'],
                  },
                ]}
                tintColor={DANGER['500']}/>
            ]
          ),
          // headerRight: IconBottomSheet,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="FriendMemoriesListScreen"
        component={FriendMemoriesListScreen}
        options={({ route }) => ({
          title: '',
          headerLeft: (canGoBack, tintColor) => (
            [
              <HeaderLeftButton 
                key="icon"
                canGoBack={canGoBack}
                tintColor={tintColor}/>, 
              <HeaderLeftTitle
                key="text"
                nickName={route.params.item.nickName}
                tagId={route.params.item.id}/>
            ]
          ),
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
