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

import { Dimensions } from 'react-native';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

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
          style={[styles.modalContainer, { width: '100%', height: '100%' }]}
          onPress={() => setModalVisible(false)}
        >
          <TouchableHighlight>
            <ImageZoom
              minScale={1.0}
              maxScale={3.0}
              imageContainerStyle={{
                width: width * 1.35,
                height: height * 1.35,
              }}
              uri={item.uri}
            ></ImageZoom>
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
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FourCutListItem;
