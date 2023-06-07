import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getMemoriesPath, getMemoriesPhoto } from "../api/memories";
import { useFocusEffect } from "@react-navigation/core";
import MapView from "../components/navermap/MapView";
import { useMemoriesContext } from "../contexts/MemoriesContext";
import PictureMarker from "../components/navermap/PictureMarker";
import PictureUploadModal from "../components/modals/PictureUploadModal";
import PictureViewModal from "../components/modals/PictureViewModal";

const MemoriesViewScreen = ({ route }) => {
  const { memoryId } = route.params;
  const { 
    trackingLocation, setTrackingLocation,
    pictureMarker, setPictureMarker,
  } = useMemoriesContext();

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPictureMarker, setSelectedPictureMarker] = useState(null);

  useEffect(() => {
    console.log("Picture Marker: ", selectedPictureMarker);
    selectedPictureMarker !== null
      ? setVisibleModal(true)
      : setVisibleModal(false);
  }, [selectedPictureMarker]);

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
    getMemoriesPhoto(memoryId)
      .then(response => {
        console.log(response.data);
        const markerData = response.data.map((item, index) => {
          console.log((item, index));
          const data = {
            id: index,
            latitude: item.spotLatitude,
            longitude: item.spotLongitude,
            uri: item.memoryPhotos[0],
          };
          return data;
        })

        setPictureMarker(markerData);
      })
      .catch(error => console.error(error));
      

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