//네컷사진 컴포넌트

import { memo, useState } from 'react';
import {
  Alert,
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
import FourCutFAB from './FourCutFAB';
import FriendTagButton from './FriendTagButton';
import { getFourCutTag } from '../api/fourCutApi';
import { saveImageToGallery } from '../functions/saveImage';

const FourCutListItem = memo(({ item, width, height }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const viewWidth = Dimensions.get('window').width;
  const viewHeight = Dimensions.get('window').height;
  const [tag, setTag] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true);
          getFourCutTag(item.id, setTag);

          console.log(tag);
          console.log(item);
        }}
      >
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
          <View>
            <TouchableHighlight
              style={{ width: width * 1.5, height: height * 1.5 }}
            >
              <ReactNativeZoomableView minZoom={1.0} maxZoom={3.0}>
                <Image
                  style={{ width: width * 1.4, height: height * 1.4 }}
                  source={{ uri: item.uri }}
                ></Image>
              </ReactNativeZoomableView>
              {/**/}
            </TouchableHighlight>
            <FriendTagButton
              style={{ position: 'absolute', bottom: 24, right: 24 }}
              tagFriend={tag}
            ></FriendTagButton>
          </View>
        </Pressable>

        <FourCutFAB onPress={() => setModalVisible(false)} style={{ left: 16 }}>
          <Image
            style={styles.image}
            source={require('../../assets/Icon_Clear.png')}
          ></Image>
        </FourCutFAB>
        <FourCutFAB
          onPress={() => {
            if (!isLoading) {
              setIsLoading(true);
              saveImageToGallery(item.uri);

              setIsLoading(false);
            }
          }}
          style={{ right: 16 }}
        >
          <Image
            style={styles.image}
            source={require('../../assets/Icon_Download.png')}
          ></Image>
        </FourCutFAB>
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
  image: { width: 24, height: 24, tintColor: WHITE },
});

export default FourCutListItem;
