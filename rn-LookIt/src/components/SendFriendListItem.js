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
import { cancelFriendRequest } from '../api/friendApi';
import { GRAY, BLACK, PRIMARY } from '../colors';
import { useUserContext } from '../contexts/UserContext';

const SendFriendListItem = memo(({ item, reset }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.nickNameFont}>{item.nickName}</Text>
        <Text style={styles.idFont}>#{item.id}</Text>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!isLoading) {
              setIsLoading(true);
              cancelFriendRequest(user, item.id);

              reset(true);
              setIsLoading(false);
            }
          }}
        >
          <Text style={styles.idFont}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

SendFriendListItem.displayName = 'SendFriendListItem';

SendFriendListItem.propTypes = {
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

export default SendFriendListItem;
