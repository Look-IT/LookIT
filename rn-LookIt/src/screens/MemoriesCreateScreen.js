import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import NaverMapView, { Marker } from "react-native-nmap";
import Button, { ButtonTypes } from "../components/Button";
import LandmarkMarker from "../components/LandmarkMarker";
import PathLine from "../components/PathLine";
import { useEffect, useState } from "react";
import PictureUploadModal from "../components/modals/PictureUploadModal";
import MemoriesMarker from "../components/MemoriesMarker";

const MemoriesCreateScreen = ({ route }) => {
  const navigation = useNavigation();

  const [currentClickLocation, setcurrentClickLocation] = useState(null);
  const [myMarkerLocation, setMyMarkerLocation] = useState([]);


  useEffect(() => {
    console.log('createScreen myPosition: ',  route.params.myPosition);
    console.log('createScreen movePath: ',  route.params.movePath);
    console.log('createScreen landmarks: ',  route.params.landmarks);
  }, []);

  useEffect(() => {
    console.log('currentClickLocation', currentClickLocation);
  }, [currentClickLocation]);

  useEffect(() => {
    console.log('myMarkerLocation', myMarkerLocation);
  }, [myMarkerLocation]);

  const onPressSuccess = () => {
    setMyMarkerLocation(prevMyMarkerLocation => [...prevMyMarkerLocation, currentClickLocation]);
  }

  return (
    <>
      <View
        style={[styles.buttonContainer, {
          position: 'absolute',
          zIndex: 3,
        }]}
      >
        <Button
          title="다음"
          onPress={() => {
            navigation.popToTop();
            ToastAndroid.show(
              '추억 일지가 생성되었습니다.',
              ToastAndroid.LONG,
            );
          }}
        />
      </View>
      <NaverMapView
        style={{width:'100%', height:'100%'}}
        zoomControl={false}
        scaleBar={false}
        center={{...route.params.myPosition, zoom: 16}}
        onMapClick={e => {
          setcurrentClickLocation({
            'latitude': e.latitude,
            'longitude': e.longitude,
          });
        }}
      >
        
        {
          currentClickLocation ?
          <>
            <PictureUploadModal
              onPressCancel={() => setcurrentClickLocation(null)}
              onPressSuccess={onPressSuccess}
              spotLatitude={currentClickLocation.latitude}
              spotLongitude={currentClickLocation.longitude}
            />
            <Marker
              coordinate={currentClickLocation}
              image={require('../../assets/Icon_Location-2-Selected.png')}
              width={48}
              height={48}
            />
          </>
          : null
        }

        <MemoriesMarker myMarkerLocation={myMarkerLocation}/>

        
        <Marker
          coordinate={route.params.myPosition}
          image={require('../../assets/Icon_My-Location.png')}
          width={16}
          height={16}
        />

        <LandmarkMarker landmarks={route.params.landmarks} />
        <PathLine movePath={route.params.movePath} />

      </NaverMapView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 48,
    position: 'absolute',
    bottom: 24,
    zIndex: 10,
    paddingHorizontal: 10,
  }
})

export default MemoriesCreateScreen;