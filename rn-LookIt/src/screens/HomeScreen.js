import { StyleSheet, View } from "react-native"
import MapView from "../components/navermap/MapView";
import React, { useEffect, useRef, useState } from "react";
import { checkMultiplePermissions } from "../functions/Permissions";
import MemoriesFloatingButton from "../components/buttons/memoriesFloatingButton";
import FloatingButton from "../components/buttons/FloatingButton";
import { PRIMARY } from "../colors";
import { useLocationTracking } from "../components/navermap/functions/WatchingLocation";
import { useMemoriesContext } from "../contexts/MemoriesContext";
import MemoriesModal from "../components/modals/MemoriesModal";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {

  const { setMemoryId, setTrackingLocation, setPictureMarker, setTags } = useMemoriesContext();

  const [isobserving, setIsObserving] = useState(false); // 경로 기록 여부 체크
  const [isCurrentWatch, SetIsCurrentWatch] = useState(false); // 내 위치 파악 여부 체크
  const [visibleModal, setVisibleModal] = useState(false);

  useLocationTracking(isCurrentWatch, false);

  useEffect(() => {
    checkMultiplePermissions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setMemoryId(null);
      setTrackingLocation([]);
      setPictureMarker([]);
      setTags([]);
    }, [])
  )

  return (
    <View style={styles.ViewContainer}>
      
      {
        visibleModal && (
          <MemoriesModal 
            clicked={visibleModal}
            setVisibleModal={setVisibleModal}/>
        )
      }

      <MapView />

      <MemoriesFloatingButton
        activation={isobserving}
        onPress={() => {
          
          if (isobserving) {
            console.log('ㅡㅡㅡㅡㅡ기록 종료ㅡㅡㅡㅡㅡ');
            setVisibleModal(true);
          } else {
            console.log('ㅡㅡㅡㅡㅡ기록 시작ㅡㅡㅡㅡㅡ');
            setVisibleModal(false);
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
              onPress={() => console.log('추억 네컷')} />
          : null
        }

        <FloatingButton
          icon={
            isCurrentWatch || isobserving
              ? require('../../assets/Icon_Gps-filled.png')
              : require('../../assets/Icon_Gps.png')
          }
          onPress={() => {
            !isobserving && SetIsCurrentWatch(!isCurrentWatch);
          }}/>
        
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

export default HomeScreen;