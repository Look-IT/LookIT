import { Path } from "react-native-nmap";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import { PRIMARY } from "../../colors";

const TrackingLine = () => {
  const { trackingLocation } = useMemoriesContext();

  return (
    trackingLocation.length > 1 ?
      <Path
        coordinates={trackingLocation}
        color={PRIMARY['500']}
        outlineWidth={2}
        outlineColor={'#ffffff'}
        width={10}
        pattern={require('../../../assets/path_pattern.png')}
        patternInterval={45}/>
    : null
  );
}

export default TrackingLine;