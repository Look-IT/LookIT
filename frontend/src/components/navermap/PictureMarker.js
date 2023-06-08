import { Marker } from "react-native-nmap";
import { useMemoriesContext } from "../../contexts/MemoriesContext"
import { Image } from "react-native";

const PictureMarker = ({selectedPictureMarker, setSelectedPictureMarker}) => {
  const { pictureMarker } = useMemoriesContext();

  return pictureMarker.map((marker, index) => {

    return (
      <Marker
        key={index}
        width={32}
        height={32}
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        onClick={() => {
          console.log('selected Id: ', marker.id);
          setSelectedPictureMarker(marker.id);
        }}>

        {
          selectedPictureMarker === marker.id && !marker.uri
          ?
            <Image
              style={{
                width: '100%',
                height: '100%',
              }} 
              source={require('../../../assets/Icon_Location-2-Selected.png')} /> 
          :
            <Image
            style={{
              width: '100%',
              height: '100%',
            }} 
            source={require('../../../assets/Icon_Location-2-Unselected.png')} />
        }
      </Marker>
    )
  })
}

export default PictureMarker;