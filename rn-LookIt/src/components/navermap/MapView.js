import NaverMapView, { Marker } from "react-native-nmap"

import { getCurrentLocation } from "./functions/GetLocation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { callLandmarks } from "../../api/landmarks";
import MyLocationMarker from "./MyLocationMarker";
import { useFocusEffect } from "@react-navigation/native";
import LandmarkMarker from "./LandmarkMarker";
import LandmarkBottomSheet from "./LandmarkBottomSheet";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import TrackingLine from "./TrackingLine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestPermissions } from "../../functions/Permissions";
import { getLandmarkAndMyPositionDistance } from "../../functions/getLandmarkAndMyPositionDistance";

const MapView = ({
  children,
  onPressMap = () => {},
  setLandmarkId = () =>{},
  isView}) => {

  const { myLocation, setMyLocation, trackingLocation } = useMemoriesContext();

  const [landmarks, setLandmarks] = useState(null);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const refRBSheet = useRef();

  const getDistance = () => {
    const landmarkDistance = landmarks?.map(landmark => {
      const distance = myLocation && getLandmarkAndMyPositionDistance(landmark, myLocation);
      const data = {
        id: landmark.landmarkId,
        distance: distance,
      };
      return data;
    })

    const landmarkId = landmarkDistance?.reduce((min, obj) => 
      obj.distance < min.distance ? obj : min
    ).id;

    landmarkId
      ? setLandmarkId(landmarkId)
      : setLandmarkId(null);
  }

  useEffect(() => {
    getDistance();
  }, [myLocation]);

  useEffect(() => {
    isView && trackingLocation.length &&
    setMyLocation(trackingLocation[0]);
  }, [trackingLocation]);

  const fetchData = async () => {

    const fetchedLandmarks = await callLandmarks();
    setLandmarks(fetchedLandmarks);
    
    !isView &&
    getCurrentLocation()
      .then(location => {
        setMyLocation(location);
      })
      .catch(error => console.log(error));


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
            }}>
            
            { !isView && <MyLocationMarker/> }

            {
              landmarks && !isView && (
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

            {children}

            {
              isView && trackingLocation.length > 1 &&
              <>
              <Marker
                coordinate={trackingLocation[0]}
                image={require('../../../assets/Icon_Marker_Start.png')}
                width={48}
                height={48}
              />
              <Marker
                coordinate={trackingLocation[trackingLocation.length - 1]}
                image={require('../../../assets/Icon_Marker_End.png')}
                width={48}
                height={48}
              />
              </>
            }

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