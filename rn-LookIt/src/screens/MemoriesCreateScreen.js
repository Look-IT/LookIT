import { View, StyleSheet } from "react-native";
import { useMemoriesContext } from "../contexts/MemoriesContext";
import { useEffect } from "react";
import MapView from "../components/navermap/MapView";
import Button from "../components/buttons/Button";
import { useNavigation } from "@react-navigation/native";

const MemoriesCreateScreen = ({}) => {
  const { setPictureMarker, pictureMarker } = useMemoriesContext();
  const navigation = useNavigation();

  return (
    <View style={styles.ViewContainer}>

      <MapView
        onPressMap={(event) => {
          const locationData = {
            id: pictureMarker.length,
            latitude: event.latitude,
            longitude: event.longitude,
            uri: null
          };
          setPictureMarker(prevData => [...prevData, locationData]);
        }}/>

      <View style={styles.buttonContainer}>
        <Button
          title="다음"
          onPress={() => navigation.navigate('MemoriesInfoTagScreen')}/>
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
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
    paddingHorizontal: 10,
  }
})

export default MemoriesCreateScreen;