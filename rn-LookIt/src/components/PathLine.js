import { Path } from "react-native-nmap";

import { PRIMARY, WHIHE } from "../colors";

const PathLine = ({movePath}) => {
  return (
    movePath.length > 1 ?
      <Path
        coordinates={movePath}
        color={PRIMARY[500]}
        outlineWidth={2}
        outlineColor={'#ffffff'}
        // onClick={() => console.warn('onClick! path')} /
        width={10}
        pattern={require('../../assets/path_pattern.png')}
        patternInterval={45}/>
    :
    null
  );
};

export default PathLine