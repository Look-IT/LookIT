//그냥 친구 목록 컴포넌트

import { memo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK, PRIMARY, WHITE } from '../colors';
import { useUserContext } from '../contexts/UserContext';
import { sendFriendRequest } from '../api/friendApi';

const AddFriendListItem = memo(({ item }) => {
  const { user } = useUserContext();
  const [isRequested, setIsRequested] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.nickNameFont}>{item.nickName}</Text>
        <Text style={styles.idFont}>#{item.tagId}</Text>
      </View>
      <View style={styles.textContainer}>
        {isRequested ? (
          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: GRAY[400] }]}
            onPress={() => {}}
          >
            <Text style={styles.buttonFont}>요청됨</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setIsRequested(true);
              sendFriendRequest(user, item.tagId);
            }}
          >
            <Text style={styles.buttonFont}>친구 요청</Text>
          </TouchableOpacity>
        )}
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
