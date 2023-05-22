//홈 스크린. 지도가 들어갈 곳.

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, Button, Alert, ToastAndroid, Modal } from 'react-native';
import { WHITE } from '../colors';
import NaverMapView, { Marker, Path, Polyline } from 'react-native-nmap';
import React, { useEffect, useRef, useState } from 'react';
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useUserContext } from '../contexts/UserContext';
import { memoriesCreatePost } from '../api/memories';
import { landmarksGet } from '../api/landmarks';
import MemoriesFloatingButton from '../components/memoriesFloatingButton';
import FloatingButton from '../components/FloatingButton';
import PathLine from '../components/PathLine';
import LandmarkMarker from '../components/LandmarkMarker';

import { Camera, CameraType } from 'expo-camera';
import MemoriesModal from '../components/modals/MemoriesModal';
import LandmarkAndMyPositionDistance from '../functions/LandmarkAndMyPositionDistance';



const hasLocationPermission = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }
  
  const hasPermission = await check(
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );
  console.log(hasPermission);

  if (hasPermission === RESULTS.GRANTED) {
    return true;
  }

  const status = await request(
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );
  console.log("status", status);

  if (status === RESULTS.GRANTED) {
    return true;
  }

  if (status === RESULTS.DENIED) {
    ToastAndroid.show(
      'Location permission denied by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
}


const HomeScreen = () => {
  const { userId } = useUserContext();

  const [myPosition, setMyPosition] = useState(null);
  const [movePath, setMovePath] = useState([]);

  const [landmarks, setLandmarks] = useState([]);

  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [locationDialog, setLocationDialog] = useState(true);
  const [observing, setObserving] = useState(false);

  const watchId = useRef(null);
  const currentWatchId = useRef(null);
  const [isCurrentWatch, SetIsCurrentWatch] = useState(false);

  const navigation = useNavigation();

  const [visibleModal, setVisibleModal] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const [key, setKey] = useState(0);

  useEffect(() => {
    async function getLandmarks() {
      try {
        const response = await landmarksGet(
          'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/main/landmarks',
        );
        
        if (response.data) {
          setLandmarks(response.data);
          console.log(response.data);
        }
  
      } catch (error) {
        console.log(error.message);
      }
    }
    getLandmarks();
    stopLocationUpdates();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen was focused');
      console.log("-----------------------------FOCUS");
      // getLocation();
      // stopLocationUpdates();
      setKey(prevKey => prevKey + 1);
      // stopLocationUpdates();
      // setVisibleModal(false);
      // setMovePath([]);

      return () => {
        console.log('Screen was unfocused');
      };
    }, [])
  );

  const memoriesSuccess = () => {
    setKey(prevKey => prevKey + 1);
    stopLocationUpdates();
    setVisibleModal(false);
    setMovePath([]);
  }

  useEffect(() => {
    getLocation();
    stopLocationUpdates();
  }, []);

  const onGetPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('카메라 접근 권한', '카메라 접근 권한이 필요합니다.', [
        {
          text: '확인',
          onPress: () => {},
        },
      ]);
      return;
    }
    console.log(status);
    navigation.navigate('Camera');
  };
  
  const stopLocationUpdates = async () => {
    
    if (watchId.current !== null) {
      // try {
      //   console.log("id" + userId);
      //   console.log(JSON.stringify(myPosition));
      //   const response = await memoriesCreatePost(
      //     'http://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/memories/create',
      //     4,
      //     myPosition,
      //   );
        
      //   if (response.data) {
      //     console.log(response.data);
      //   }

      // } catch (error) {
      //   console.log(error.message);
      // }

      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      // setMyPosition([]);
      // setMovePath([]);
      setObserving(false);
      setVisibleModal(true);
    }
  };

  useEffect(() => {
    console.log(myPosition);
    // LandmarkAndMyPositionDistance(landmarks, myPosition);
  }, [myPosition]);

  useEffect(() => {
    console.log('movePath: ', movePath);
  }, [movePath]);

  const getLocation = async () =>{
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setMyPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setMyPosition(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
      }
    )
  }

  const getCurrentLocation = async () =>{
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (currentWatchId.current !== null) {
      console.log('NOT NULL');
      Geolocation.clearWatch(currentWatchId.current);
      currentWatchId.current = null;
      SetIsCurrentWatch(false);
      return;
    }

    SetIsCurrentWatch(true);
    currentWatchId.current = Geolocation.watchPosition(
      position => {
        const positionValue = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setMyPosition(positionValue);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );

    console.log(currentWatchId.current);
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    setObserving(true);
    setVisibleModal(false);

    watchId.current = Geolocation.watchPosition(
      position => {
        const positionValue = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        // setMyPosition([...myPosition, positionValue]);
        // setMyPosition(prevPosition => [...prevPosition, positionValue]);
        setMyPosition(positionValue);
        setMovePath(prevPosition => [...prevPosition, positionValue]);

      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  };
  console.log('visible: ', visibleModal);

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);

      return () => {
        setIsFocused(false);
      }
    }, [])
  );

  const onPressCancel = () => {
    setMovePath([]);
    setVisibleModal(false);
  }


  return (
    <>
      {
        visibleModal ?
          <MemoriesModal
            clicked={visibleModal}
            myPosition={myPosition}
            movePath={movePath}
            landmarks={landmarks}
            onPressCancel={onPressCancel}
            onPressSuccess={memoriesSuccess}
          />
        : null        
      }

      {
        myPosition ?
          <NaverMapView
            key={key}
            style={{width:'100%', height:'100%'}}
            center={{...myPosition, zoom: 16}}
            zoomControl={false}
            scaleBar={false}
          >
            <LandmarkMarker
              landmarks={landmarks}
              keyLoading={() => {
                // setKey(prevKey => prevKey + 3);
                console.log('keyLoading')
              }}
            />
            
            <Marker
              key={key + 2}
              coordinate={myPosition}
              image={require('../../assets/Icon_My-Location.png')}
              width={16}
              height={16}
            />
            
            <PathLine movePath={movePath}/>
          </NaverMapView>
        : null
      }


      

      <View style={styles.container}>
        {
          !observing ?
            <MemoriesFloatingButton
              icon={require('../../assets/Icon_Guide.png')}
              text={'경로 기록'}
              activation={false}
              onPress={getLocationUpdates}
            />
          :
            <MemoriesFloatingButton
              icon={require('../../assets/Icon_Stop.png')}
              text={'기록 종료'}
              activation={true}
              onPress={stopLocationUpdates}
            />
        }
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 24,
          right: 16,
        }}
      >
        <FloatingButton
          icon={require('../../assets/Icon_Film.png')}
          onPress={onGetPermission}
        />

        {
          !isCurrentWatch ?
            <FloatingButton
              style={{marginTop: 16}}
              icon={require('../../assets/Icon_Gps.png')}
              onPress={getCurrentLocation}
            />
          :
            <FloatingButton
              style={{marginTop: 16}}
              icon={require('../../assets/Icon_Gps-filled.png')}
              onPress={getCurrentLocation}
            />
        }

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  button: {
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 24,
    right: 20,
    height: 70,
    color: 'red',
    borderRadius: 100,
    zIndex:10,
  },
  buttons: {
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 300,
    right: 20,
    height: 70,
    color: 'red',
    borderRadius: 100,
    zIndex:10,
  }
});

export default HomeScreen;
