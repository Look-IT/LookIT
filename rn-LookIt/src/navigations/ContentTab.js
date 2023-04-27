//화면 아래 네비게이션 바 컴포넌트 코드

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import FriendListScreen from '../screens/FriendListScreen';
import CollectionScreen from '../screens/CollectionScreen';
import SettingScreen from '../screens/SettingScreen';
import { MainRoutes } from './routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY } from '../colors';

const Tab = createBottomTabNavigator();

const getTabBarIcon = ({ focused, color, size, name }) => {
  const iconName = focused ? name : `${name}-outline`;
  return (
    <MaterialCommunityIcons
      name={iconName}
      color={color}
      size={size}
    ></MaterialCommunityIcons>
  );
};

const ContentTab = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: PRIMARY.DEFAULT,
          tabBarStyle: {
            height: 48,
            justifyContent: 'center',
            paddingBottom: 3,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="홈"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'home' }),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="친구"
          component={FriendListScreen}
          options={{
            tabBarIcon: (props) =>
              getTabBarIcon({ ...props, name: 'account-multiple' }),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="컬렉션"
          component={CollectionScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'trophy' }),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="설정"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'cog' }),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default ContentTab;
