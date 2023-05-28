import { Pressable, StyleSheet, Text, View } from "react-native"
import MapView from "../components/navermap/MapView";
import { useEffect, useRef, useState } from "react";
import { checkMultiplePermissions } from "../functions/Permissions";
import { apiClient, storeToken } from "../api/apiClient";
import MemoriesFloatingButton from "../components/buttons/memoriesFloatingButton";
import FloatingButton from "../components/buttons/FloatingButton";
import { PRIMARY } from "../colors";
import { startWatchingLocation, stopWatchingLocation, useLocationTracking } from "../components/navermap/functions/WatchingLocation";
import { MemoriesProvider, useMemoriesContext } from "../contexts/MemoriesContext";

const MapViewScreen = () => {

  const [isobserving, setIsObserving] = useState(false); // 경로 기록 여부 체크
  const [isCurrentWatch, SetIsCurrentWatch] = useState(false); // 내 위치 파악 여부 체크

  useLocationTracking(isCurrentWatch, false);

  useEffect(() => {
    checkMultiplePermissions();
    storeToken('abd');
  }, []);

  return (
    <View style={styles.ViewContainer}>
      <MapView/>

      <MemoriesFloatingButton
        activation={isobserving}
        onPress={() => {
          
          if (isobserving) {
            console.log('ㅡㅡㅡㅡㅡ기록 종료ㅡㅡㅡㅡㅡ');
          } else {
            console.log('ㅡㅡㅡㅡㅡ기록 시작ㅡㅡㅡㅡㅡ');
          }
          
          
          setIsObserving(!isobserving);
        }}/>

      <View
        style={styles.FloatingBox}>

        {
          isobserving ?
            <FloatingButton
              style={{backgroundColor: PRIMARY['700']}}
              icon={require('../../assets/Icon_Film_white.png')}
              onPress={() => console.log('추억 네컷')}
            />
          : null
        }

        {
          <FloatingButton
            icon={
              isCurrentWatch || isobserving
                ? require('../../assets/Icon_Gps-filled.png')
                : require('../../assets/Icon_Gps.png')
            }
            onPress={() => {
              !isobserving && SetIsCurrentWatch(!isCurrentWatch);
            }}/>
        }
        
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FloatingBox: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
  marginTop: {
    marginTop: 16
  }
})

export default MapViewScreen;