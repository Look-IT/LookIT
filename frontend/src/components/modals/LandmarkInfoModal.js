import { Modal, View, Text, Image } from "react-native"
import { WHITE } from "../../colors";
import { useState } from "react";


const LandmarkInfoModal = ({ visible, setVisible, landmarkData }) => {

  if (landmarkData === null) {
    return;
  }

  return (
    <Modal
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animationType={'slide'}
      visible={true}
      onRequestClose={setVisible}
      transparent={true}
    >
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%'
          }}>
            <View
              style={{
                backgroundColor: WHITE,
                width: '100%',
                height: 300,
                bottom: 0,
                padding: 16,
              }}>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 400,
                    lineHeight: 20,
                    marginBottom: 24,
                  }}>
                  {landmarkData.landmarkName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 16,
                  }}>
                  {landmarkData.landInfo}
                </Text>
                {/* <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 16,
                  }}>
                  {landmarkData.landInfo}
                </Text> */}
              </View>
              <Image
                style={{
                  width: 128,
                  height: 192,
                  marginLeft: 16,
                }}
                source={{ uri: landmarkData.frameUrl}}>

              </Image>
            </View>

            </View>

            

        </View>

    </Modal>
  )
}

export default LandmarkInfoModal;