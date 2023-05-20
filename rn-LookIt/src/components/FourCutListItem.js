//네컷사진 컴포넌트

import { memo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK, WHITE } from '../colors';
import { Modal } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { Dimensions } from 'react-native';

const FourCutListItem = memo(({ item, width, height }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const viewWidth = Dimensions.get('window').width;
  const viewHeight = Dimensions.get('window').height;
  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width: width, height: height }]}>
          <Image
            style={{ width: width, height: height }}
            source={{ uri: item.uri }}
          ></Image>
        </View>
      </Pressable>

      <Modal
        visible={modalVisible}
        modalVisible
        transparent={true}
        animationType="fade"
      >
        <Pressable
          style={[
            styles.modalContainer,
            { width: '100%', height: '100%', backgroundColor: '#00000050' },
          ]}
          onPress={() => setModalVisible(false)}
        >
          <TouchableHighlight>
            <Image
              style={{ width: width * 1.35, height: height * 1.35 }}
              source={{ uri: item.uri }}
            ></Image>
          </TouchableHighlight>
        </Pressable>
      </Modal>
    </>
  );
});

FourCutListItem.displayName = 'FourCutListItem';

FourCutListItem.propTypes = {
  item: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: 'black',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FourCutListItem;
