//그냥 친구 목록 컴포넌트

import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK } from '../colors';

const DiaryListItem = memo(({ item }) => {
  return (
    <View style={styles.container}>
      <View></View>
      <View></View>
      <View></View>
    </View>
  );
});

DiaryListItem.displayName = 'DiaryListItem';

DiaryListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 228,

    alignItems: 'center',
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

export default DiaryListItem;
