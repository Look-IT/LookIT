//그냥 친구 목록 컴포넌트

import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK } from '../colors';

const FourCutListItem = memo(({ item, width, height }) => {
  return (
    <View style={[styles.container, { width: width, height: height }]}></View>
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
    backgroundColor: 'black',
  },
  nickNameFont: {
    fontSize: 14,
    fontWeight: 500,
    color: BLACK,
    paddingRight: 8,
  },
  idFont: {
    fontSize: 10,
    fontWeight: 500,
    color: GRAY[400],
  },
});

export default FourCutListItem;
