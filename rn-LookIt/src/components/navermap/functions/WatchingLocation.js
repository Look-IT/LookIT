import { useEffect, useRef, useState } from "react";
import { checkMultiplePermissions } from "../../../functions/Permissions"
import Geolocation from 'react-native-geolocation-service';
import { useMemoriesContext } from "../../../contexts/MemoriesContext";

export const useLocationTracking = (shouldTrack) => {
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
          setTrackingLocation(prevLocation => [...prevLocation, positionData]);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 15,
          interval: 5000,
          fastestInterval: 3000,
        },
      );
      setWatchId(Id);

    } else if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
      setTrackingLocation([]);
    }

  }, [shouldTrack]);
}