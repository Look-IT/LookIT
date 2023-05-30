import NaverMapView from "react-native-nmap"

import { getCurrentLocation } from "./functions/GetLocation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { callLandmarks } from "../../api/landmarks";
import MyLocationMarker from "./MyLocationMarker";
import { useFocusEffect } from "@react-navigation/native";
import LandmarkMarker from "./LandmarkMarker";
import LandmarkBottomSheet from "./LandmarkBottomSheet";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import TrackingLine from "./TrackingLine";
import PictureMarker from "./PictureMarker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PictureUploadModal from "../modals/PictureUploadModal";
import { requestPermissions } from "../../functions/Permissions";

const MapView = ({onPressMap = () => {}}) => {

  const { myLocation, setMyLocation, trackingLocation, pictureMarker } = useMemoriesContext();

  const [landmarks, setLandmarks] = useState(null);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const refRBSheet = useRef();

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPictureMarker, setSelectedPictureMarker] = useState(null);

  const fetchData = async () => {
    getCurrentLocation()
      .then(location => setMyLocation(location))
      .catch(error => console.log(error));

    const fetchedLandmarks = await callLandmarks();
    setLandmarks(fetchedLandmarks);

    // 삭제 필요
    const value = await AsyncStorage.getItem('@token');
    console.log('token: ', value);

  }

  useFocusEffect(
    useCallback(() => {
      const runPermission = async () =>{
        try {
          await requestPermissions();
          console.log('END');
      
          fetchData();
        } catch (error) {
          console.error(error);
        }
      }
      runPermission();
      
    }, [])
  )

  // 삭제 필요
  useEffect(() => {
    console.log("TRACKING LOCATION: ", trackingLocation);
  }, [trackingLocation]);

  useEffect(() => {
    console.log("Picture Marker; ", selectedPictureMarker);
    selectedPictureMarker !== null
      ? setVisibleModal(true)
      : setVisibleModal(false);
  }, [selectedPictureMarker]);

  return (
    <>
      {
        myLocation && (
          <NaverMapView
            style={{width:'100%', height:'100%'}}
            center={{...myLocation, zoom: 16}}
            zoomControl={false}
            scaleBar={false}
            useTextureView={true}
            onMapClick={(event) => {
              onPressMap(event);
              setSelectedPictureMarker(pictureMarker.length)
            }}>
            
            <MyLocationMarker/>

            {
              landmarks && (
                <LandmarkMarker 
                  landmarks={landmarks}
                  onClick={() => {
                    refRBSheet.current.open();
                  }}
                  selectedLandmark={selectedLandmark}
                  setSelectedLandmark={setSelectedLandmark}/>
              )
            }
            
            <TrackingLine/>

            <PictureMarker
              selectedPictureMarker={selectedPictureMarker}
              setSelectedPictureMarker={setSelectedPictureMarker}/>
            

          </NaverMapView>
        )
      }

      <LandmarkBottomSheet 
        landmarkId={selectedLandmark}
        refRBSheet={refRBSheet}
        setSelectedLandmark={setSelectedLandmark}/>
      
      <PictureUploadModal
        visibleModal={visibleModal}
        selectedPictureMarker={selectedPictureMarker}
        setSelectedPictureMarker={setSelectedPictureMarker}/>
    </>
  )
}

export default MapView;