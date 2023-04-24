//스크린들을 쌓아두는 stack

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/FriendListScreen';
import { PRIMARY, WHITE } from '../colors';
import HeaderLeftButton from '../components/HeaderLeftButton';

//로그인 후 화면에 표시되는 스크린 stack

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FriendList"
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },

        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: 'TODO LIST',
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStack;
