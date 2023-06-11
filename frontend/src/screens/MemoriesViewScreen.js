import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getMemoriesPath, getMemoriesPhoto } from "../api/memories";
import { useFocusEffect } from "@react-navigation/core";
import MapView from "../components/navermap/MapView";
import { useMemoriesContext } from "../contexts/MemoriesContext";
import PictureMarker from "../components/navermap/PictureMarker";
import PictureViewModal from "../components/modals/PictureViewModal";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const MemoriesViewScreen = ({ route }) => {
  const { memoryId } = route.params;
  const { 
    setTrackingLocation,
    pictureMarker, setPictureMarker,
  } = useMemoriesContext();

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPictureMarker, setSelectedPictureMarker] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setTrackingLocation([]);

      return () => {
        setTrackingLocation([]);
        setPictureMarker([]);
      }
    }, [])
  )

  useEffect(() => {

    selectedPictureMarker !== null
      ? setVisibleModal(true)
      : setVisibleModal(false);
      
  }, [selectedPictureMarker]);

  
  useEffect(() => {
    !visibleModal &&
      getMemoriesPhoto(memoryId)
        .then(response => {
          const markerData = response.data.map((item, index) => {
            console.log((item, index));
            const data = {
              id: index,
              latitude: item.spotLatitude,
              longitude: item.spotLongitude,
              uri: item.memoryPhotos,
            };
            return data;
          })

          markerData.length < pictureMarker.length &&
            Toast.show({
              type: 'error',
              text1: '마커가 삭제되었습니다.',
              position: 'bottom',
            })

          setPictureMarker(markerData);
        })
        .catch(error => console.error(error));
  }, [visibleModal]);

  useEffect(() => {
    getMemoriesPath(memoryId)
      .then(response => {
        const path = response.data.map(({ latitude, longitude }) => ({ latitude, longitude }))
        setTrackingLocation(path);
      })
      .catch(error => console.error(error));
  }, []);
  
  return (
    <View style={styles.ViewContainer}>
      <MapView isView={true}>
        <PictureMarker
          selectedPictureMarker={selectedPictureMarker}
          setSelectedPictureMarker={setSelectedPictureMarker}/>
      </MapView>

      <PictureViewModal
        visibleModal={visibleModal}
        selectedPictureMarker={selectedPictureMarker}
        setSelectedPictureMarker={setSelectedPictureMarker}/>

    </View>
  )
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default MemoriesViewScreen;