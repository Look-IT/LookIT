//화면 아래 네비게이션 바 컴포넌트 코드

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import FriendListScreen from '../screens/FriendListScreen';
import CollectionScreen from '../screens/CollectionScreen';
import MyPageScreen from '../screens/MyPageScreen';
import FourPictureEditScreen from '../screens/FourPictureEditScreen';
import TestScreen from '../screens/TestScreen';
import { MainRoutes } from './routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY, WHITE } from '../colors';
import { Image, StyleSheet } from 'react-native';
import HeaderRightButton from '../components/HeaderRightButton';
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
            headerShown: true,
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
            headerShown: true,
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
          name="내 프로필"
          component={MyPageScreen}
          options={{
            headerShown: true,
            headerRight: HeaderRightButton,
            headerRightContainerStyle: { paddingRight: 16 },
            tabBarIcon: (props) => {
              return props.focused ? (
                <Image
                  source={require('../../assets/Icon_MyPage.png')}
                  style={styles.image}
                ></Image>
              ) : (
                <Image
                  source={require('../../assets/Icon_MyPage-outline.png')}
                  style={styles.image}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="네컷촬영"
          component={TestScreen}
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
