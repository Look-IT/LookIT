import { useRef } from "react"
import RBSheet from "react-native-raw-bottom-sheet"
import { GRAY } from "../../colors";
import { Text, View } from "react-native";

const LandmarkBottomSheet = ({landmarkId, refRBSheet, setSelectedLandmark}) => {
  

  return (
    <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          height={224}
          animationType="fade"
          onClose={() => setSelectedLandmark(null)}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000000',
            },
            container: {
              width: '100%',
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: GRAY['200']
            },
          }}
        >
          <View>
            <Text>
              {landmarkId}
            </Text>
          </View>

    </RBSheet>
  )
}

export default LandmarkBottomSheet;