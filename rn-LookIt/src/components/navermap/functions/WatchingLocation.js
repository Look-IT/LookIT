import { useEffect, useRef, useState } from "react";
import Geolocation from 'react-native-geolocation-service';
import { useMemoriesContext } from "../../../contexts/MemoriesContext";

export const useLocationTracking = (shouldTrack, isTrackingSave) => {
  const {setMyLocation, setTrackingLocation } = useMemoriesContext();
  const [watchId, setWatchId] = useState(null);
  
  useEffect(() => {

    if (shouldTrack) {
      const Id = Geolocation.watchPosition (
        position => {
          const positionData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setMyLocation(positionData);
          isTrackingSave && setTrackingLocation(prevLocation => [...prevLocation, positionData]);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 15,
          interval: 2000,
          fastestInterval: 2000,
        },
      );
      setWatchId(Id);

    } else if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
    }

  }, [shouldTrack]);
}