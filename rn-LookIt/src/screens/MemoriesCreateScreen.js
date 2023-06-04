import { View, StyleSheet } from "react-native";
import { useMemoriesContext } from "../contexts/MemoriesContext";
import { useEffect, useState } from "react";
import MapView from "../components/navermap/MapView";
import Button from "../components/buttons/Button";
import { useNavigation } from "@react-navigation/native";
import PictureUploadModal from "../components/modals/PictureUploadModal";
import PictureMarker from "../components/navermap/PictureMarker";

const MemoriesCreateScreen = ({}) => {
  const { setPictureMarker, pictureMarker } = useMemoriesContext();
  const navigation = useNavigation();

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPictureMarker, setSelectedPictureMarker] = useState(null);

  useEffect(() => {
    console.log("Picture Marker; ", selectedPictureMarker);
    selectedPictureMarker !== null
      ? setVisibleModal(true)
      : setVisibleModal(false);
  }, [selectedPictureMarker]);

  return (
    <View style={styles.ViewContainer}>

      <MapView
        onPressMap={(event) => {
          const locationData = {
            id: pictureMarker.length,
            latitude: event.latitude,
            longitude: event.longitude,
            uri: []
          };
          setPictureMarker(prevData => [...prevData, locationData]);
          setSelectedPictureMarker(pictureMarker.length);
        }}>

          <PictureMarker
            selectedPictureMarker={selectedPictureMarker}
            setSelectedPictureMarker={setSelectedPictureMarker}/>

        </MapView>

      <View style={styles.buttonContainer}>
        <Button
          title="다음"
          onPress={() => navigation.navigate('MemoriesInfoTagScreen')}/>
      </View>

      <PictureUploadModal
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
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
    paddingHorizontal: 10,
  }
})

export default MemoriesCreateScreen;