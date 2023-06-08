import { StyleSheet, View } from "react-native"
import MapView from "../components/navermap/MapView";
import React, { useContext, useEffect, useState } from "react";
import MemoriesFloatingButton from "../components/buttons/memoriesFloatingButton";
import FloatingButton from "../components/buttons/FloatingButton";
import { PRIMARY } from "../colors";
import { useLocationTracking } from "../components/navermap/functions/WatchingLocation";
import { useMemoriesContext } from "../contexts/MemoriesContext";
import MemoriesModal from "../components/modals/MemoriesModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useUserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeToken } from "../api/apiClient";

const HomeScreen = () => {

  const { setMemoryId, trackingLocation, setTrackingLocation, setPictureMarker, setTags } = useMemoriesContext();

  const { user, setUser } = useUserContext(); // TODO: 삭제 요망

  const [isobserving, setIsObserving] = useState(false); // 경로 기록 여부 체크
  const [isCurrentWatch, SetIsCurrentWatch] = useState(false); // 내 위치 파악 여부 체크
  const [visibleModal, setVisibleModal] = useState(false);
  const navigation = useNavigation();

  const [ landmarkId, setLandmarkId ] = useState(null);

  useLocationTracking(isCurrentWatch, false);

  // TODO: 삭제 요망
  // useEffect(() => {
  //   console.log('USER: ', user);
  // }, [user]);
  // const fetchData = async () => {

  //   const value = await AsyncStorage.getItem('@token');
  //   return value;
  // }

  // useEffect(() => {
  //   !isobserving && setTrackingLocation([]);
  // }, [isobserving]);

  useFocusEffect(
    React.useCallback(() => {
      setMemoryId(null);
      // !trackingLocation && setIsObserving(true);
      // !isobserving && setTrackingLocation([]);
      setPictureMarker([]);
      setTags([]);

      // TODO:  삭제 요망
      // fetchData()
      //   .then(response => {
      //     setUser(response);
      //     storeToken(response);
      //   })
      //   .catch(error => console.log(error));
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

      <MapView setLandmarkId={setLandmarkId}/>

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
          isobserving && landmarkId ?
            <FloatingButton
              style={{backgroundColor: PRIMARY['700']}}
              icon={require('../../assets/Icon_Film_white.png')}
              onPress={() => {navigation.navigate('Camera', {landmarkId})}} />
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