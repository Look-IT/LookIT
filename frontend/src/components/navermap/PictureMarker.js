import { Marker } from "react-native-nmap";
import { useMemoriesContext } from "../../contexts/MemoriesContext"
import { Image } from "react-native";

const PictureMarker = ({selectedPictureMarker, setSelectedPictureMarker}) => {
  const { pictureMarker } = useMemoriesContext();

  return pictureMarker.map((marker, index) => {

    const size = (
      selectedPictureMarker === index
        ? 48
        : 32
    );

    return (
      <Marker
        key={index}
        width={size}
        height={size}
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        onClick={() => {
          setSelectedPictureMarker(index);
        }}>

        {
          selectedPictureMarker === index
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