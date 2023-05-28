import { useRef, useState } from "react"
import { Marker } from "react-native-nmap"
import RBSheet from "react-native-raw-bottom-sheet";
import { GRAY } from "../../colors";
import { Text, View, Image } from "react-native";

const LandmarkMarker = ({landmarks, onClick, selectedLandmark, setSelectedLandmark}) => {  

  // console.log('---- : ', selectedLandmark);
  
  return landmarks.map(landmark => {

    return (
      <Marker
        key={landmark.landmarkId}
        width={
          selectedLandmark && selectedLandmark === landmark.landmarkId
            ? 48
            : 32
        }
        height={
          selectedLandmark && selectedLandmark === landmark.landmarkId
            ? 48
            : 32
        }
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