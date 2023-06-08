
import { Marker } from "react-native-nmap"
import { View } from "react-native";

import { useEffect, useState } from "react";
import LandmarkInfoModal from "./modals/LandmarkInfoModal";

import { landmarkInfo } from "../api/landmarkInfo";



const LandmarkMarker = ({landmarks}) => {

  return landmarks.map(landmark => {

    const [clicked, setClicked] = useState(false);
    const [landmarkId, setLandmarkId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [landmarkData, setLandmarkData] = useState(null);

    useEffect(() => {
      setLandmarkId(landmark.landmarkId);
    }, []);

    useEffect(() => {
      console.log(landmarkData);
    }, [landmarkData]);

    const onPressInfo = async () => {

      try {
        const response = await landmarkInfo(
          'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/main',
          landmarkId
        )
    
        if (response.data) {
          console.log(':::: ', response.data);
          setLandmarkData(response.data);
          
        }
    
      } catch (error) {
        console.log(error.messsage);
      }
    };
    
    return (
      <> 
        {
          modalVisible ?
            <LandmarkInfoModal
              // visible = {modalVisible}
              setVisible={() => setModalVisible(false)}
              landmarkData={landmarkData}
            />
          : null
        }
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
          onClick={() => {
            setClicked(true);
            onPressInfo();
            setModalVisible(true);
          }}
        />
      </>
    );    
  })
};

export default LandmarkMarker;