
import { Marker } from "react-native-nmap"
import { View } from "react-native";

import { PRIMARY } from "../colors"
import { useEffect, useState } from "react";
import LandmarkInfo from "./LandmarkInfo";



const LandmarkMarker = ({landmarks}) => {

  return landmarks.map(landmark => {

    const [clicked, setClicked] = useState(false);
    const [landmarkId, setLandmarkId] = useState(null);

    useEffect(() => {
      setLandmarkId(landmark.landmarkId);
    }, []);

    console.log("id: " + landmarkId);
    return (
        <Marker
          key={landmark.landmarkId}
          coordinate={{
            latitude: landmark.landLatitude,
            longitude: landmark.landLongitude,
          }}
          image={
            clicked ?
              require('../../assets/Icon_Location-Selected.png')
            :
              require('../../assets/Icon_Location-Unselected.png')
          }
        />
    );    
  })
};

export default LandmarkMarker;