import { Marker } from "react-native-nmap";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import { useEffect } from "react";


const MyLocationMarker = () => {

  const { myLocation } = useMemoriesContext();

  return (
    <Marker
      coordinate={myLocation}
      image={require('../../../assets/Icon_My-Location.png')}
      width={16}
      height={16}
    />
  );
}

export default MyLocationMarker;