//네컷사진 컴포넌트

import { memo } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK } from '../colors';

const FourCutListItem = memo(({ item, width, height }) => {
  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <Image
        style={{ width: width, height: height }}
        source={{ uri: item.uri }}
      ></Image>
    </View>
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
});

export default FourCutListItem;
