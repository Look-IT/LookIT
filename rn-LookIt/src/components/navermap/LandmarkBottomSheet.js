import { useEffect, useState } from "react"
import RBSheet from "react-native-raw-bottom-sheet"
import { GRAY } from "../../colors";
import { Text, View, StyleSheet, Image } from "react-native";
import { getLandmarkInfo } from "../../api/landmarkInfo";
import { Family, Title } from "../../styles/fonts";
import { Body } from "../../styles/fonts";

const LandmarkBottomSheet = ({landmarkId, refRBSheet, setSelectedLandmark}) => {

  const [landmarkData, setLandmarkData] = useState(null);
  
  useEffect(() => {
    if (landmarkId === null) {
      return;
    }
    
    getLandmarkInfo(landmarkId)
      .then(landmarkData => setLandmarkData(landmarkData))
      .catch(error => console.error(error));

  }, [landmarkId]);

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
              borderTopColor: GRAY['200'],
            },
          }}>

          {
            landmarkData && (
              <View style={landmarkInfoStyle.container}>

                <View style={landmarkInfoStyle.textContainer}>
                  <Text style={landmarkInfoStyle.title}>
                    {landmarkData.landmarkName}
                  </Text>
                  <Text style={landmarkInfoStyle.address}>
                    {"주소주소주소주소주소주소주소주소주소주소"}
                  </Text>
                  <Text style={landmarkInfoStyle.info}>
                    {landmarkData.landInfo + landmarkData.landInfo + landmarkData.landInfo}
                  </Text>
                </View>

                <View>
                  <Image style={landmarkInfoStyle.FrameImage}
                    source={{ uri: landmarkData.frameUrl }}/>
                </View>
              </View>
            )
          }

    </RBSheet>
  )
}

const landmarkInfoStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexShrink: 1,
  },
  title: {
    ...Family.KR_Medium,
    ...Title.Medium,
    color: GRAY['900'],
    marginBottom: 8,
  },
  address: {
    ...Family.KR_Regular,
    ...Body.Small,
    color: GRAY['500'],
    marginBottom: 24,
  },
  info: {
    ...Family.KR_Regular,
    ...Body.Small,
    color: GRAY['700'],
  },
  FrameImage: {
    width: 128,
    height: 192,
    marginLeft: 16,
  }
})

export default LandmarkBottomSheet;