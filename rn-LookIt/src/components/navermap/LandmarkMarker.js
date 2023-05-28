import { useRef, useState } from "react"
import { Marker } from "react-native-nmap"
import RBSheet from "react-native-raw-bottom-sheet";
import { GRAY } from "../../colors";
import { Text, View, Image } from "react-native";

const LandmarkMarker = ({landmarks, onClick, selectedLandmark, setSelectedLandmark}) => {  

  // console.log('---- : ', selectedLandmark);
  
  return landmarks.map(landmark => {

    const size = (
      selectedLandmark && selectedLandmark === landmark.landmarkId
        ? 48
        : 32
    );

    return (
      <Marker
        key={landmark.landmarkId}
        width={size}
        height={size}
        coordinate={{
          latitude: landmark.landLatitude,
          longitude: landmark.landLongitude,
        }}
        onClick={() => {
          onClick();
          setSelectedLandmark(landmark.landmarkId);
        }}>
        {
          selectedLandmark && selectedLandmark === landmark.landmarkId
          ?
            <Image
            style={{
              width: '100%',
              height: '100%',
            }} 
            source={require('../../../assets/Icon_Location-Selected.png')} /> 
          :
            <Image
            style={{
              width: '100%',
              height: '100%',
            }} 
            source={require('../../../assets/Icon_Location-Unselected.png')} />
        }
      </Marker>
    )
  })
}

export default LandmarkMarker;