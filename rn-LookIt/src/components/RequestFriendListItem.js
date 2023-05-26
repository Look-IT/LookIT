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

import { GRAY, BLACK, PRIMARY } from '../colors';

const RequestFriendListItem = memo(({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.nickNameFont}>{item.nickName}</Text>
        <Text style={styles.idFont}>#{item.id}</Text>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity style={{ marginRight: 16 }}>
          <Text style={[styles.idFont, { color: PRIMARY[700] }]}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.idFont}>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

RequestFriendListItem.displayName = 'RequestFriendListItem';

RequestFriendListItem.propTypes = {
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
});

export default RequestFriendListItem;
