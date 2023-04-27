//화면 아래 네비게이션 바 컴포넌트 코드

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import FriendListScreen from '../screens/FriendListScreen';
import CollectionScreen from '../screens/CollectionScreen';
import SettingScreen from '../screens/SettingScreen';
import { MainRoutes } from './routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY, WHITE } from '../colors';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

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
            backgroundColor: WHITE,
            headerShown: false,
            tabBarIcon: (props) => {
              return props.focused ? (
                <Image
                  source={require('../../assets/Icon_Home.png')}
                  style={styles.image}
                ></Image>
              ) : (
                <Image
                  source={require('../../assets/Icon_Home-outline.png')}
                  style={styles.image}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="친구"
          component={FriendListScreen}
          options={{
            tabBarIcon: (props) => {
              return props.focused ? (
                <Image
                  source={require('../../assets/Icon_Friend.png')}
                  style={styles.image}
                ></Image>
              ) : (
                <Image
                  source={require('../../assets/Icon_Friend-outline.png')}
                  style={styles.image}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="컬렉션"
          component={CollectionScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => {
              return props.focused ? (
                <Image
                  source={require('../../assets/Icon_Collection.png')}
                  style={styles.image}
                ></Image>
              ) : (
                <Image
                  source={require('../../assets/Icon_Collection-outline.png')}
                  style={styles.image}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="설정"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => {
              return props.focused ? (
                <Image
                  source={require('../../assets/Icon_Setting.png')}
                  style={styles.image}
                ></Image>
              ) : (
                <Image
                  source={require('../../assets/Icon_Setting-outline.png')}
                  style={styles.image}
                ></Image>
              );x
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});

export default ContentTab;
