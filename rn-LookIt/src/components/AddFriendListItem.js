//그냥 친구 목록 컴포넌트

import { memo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK, PRIMARY, WHITE } from '../colors';

const AddFriendListItem = memo(({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.nickNameFont}>{item.nickName}</Text>
        <Text style={styles.idFont}>#{item.id}</Text>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonFont}>친구 요청</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

AddFriendListItem.displayName = 'AddFriendListItem';

AddFriendListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: PRIMARY[700],
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 81,
    borderRadius: 8,
  },
  textContainer: {
    height: 48,

    flexDirection: 'row',
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
  buttonFont: {
    fontSize: 12,
    fontWeight: 500,
    color: WHITE,
  },
});

export default AddFriendListItem;
