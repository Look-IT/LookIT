import NaverMapView, { Marker } from "react-native-nmap"

import { Text, View } from "react-native";
import Button from "../Button";
import { getCurrentLocation } from "./functions/GetLocation";
import React, { useEffect, useRef, useState } from "react";
import { callLandmarks } from "../../api/landmarks";
import MyLocationMarker from "./MyLocationMarker";
import { useFocusEffect } from "@react-navigation/native";
import LandmarkMarker from "./LandmarkMarker";
import LandmarkBottomSheet from "./LandmarkBottomSheet";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import TrackingLine from "./TrackingLine";

const MapView = ({}) => {

  const { myLocation, setMyLocation, trackingLocation } = useMemoriesContext();

  // const [myLocation, setMyLocation] = useState(null);
  const [landmarks, setLandmarks] = useState(null);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const refRBSheet = useRef();


  const fetchData = async () => {
    getCurrentLocation()
      .then(location => setMyLocation(location))
      .catch(error => console.log(error));

    const fetchedLandmarks = await callLandmarks();
    setLandmarks(fetchedLandmarks);
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('focus');
      fetchData();

    }, [])
  )

  // 삭제 필요
  useEffect(() => {
    console.log("MY LOCATION: ", myLocation);
    setMyLocation(myLocation);
  }, [myLocation]);

  // 삭제 필요
  useEffect(() => {
    console.log("TRACKING LOCATION: ", trackingLocation);
  }, [trackingLocation]);

  // // 삭제 필요
  // useEffect(() => {
  //   console.log("MY LANDMARKS: ", landmarks);
  // }, [landmarks]);

  // // 삭제 필요
  // useEffect(() => {
  //   console.log("SELECTEDLANDMARK: ", selectedLandmark);
  // }, [selectedLandmark]);

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
          >
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

          </NaverMapView>
        )
      }
      <LandmarkBottomSheet 
        landmarkId={selectedLandmark}
        refRBSheet={refRBSheet}
        setSelectedLandmark={setSelectedLandmark}/>
    </>

    )
}

export default MapView;