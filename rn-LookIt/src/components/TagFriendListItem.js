//태그 친구 목록 컴포넌트

import { memo, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK, PRIMARY } from '../colors';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

const TagFriendListItem = memo(({ item, taggedFriend, setTaggedFriend }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log('toggle:' + toggle);

    if (toggle == true) {
      setTaggedFriend((prev) => [
        ...prev,
        { nickName: item.nickName, id: item.id },
      ]);
    } else {
      setTaggedFriend((prev) => {
        return prev.filter((obj) => obj.id != item.id);
      });
    }
  }, [toggle]);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          style={styles.checkBox}
          disabled={false}
          value={toggle}
          color={toggle ? PRIMARY.DEFAULT : GRAY.DEFAULT}
          onValueChange={setToggle}
        ></Checkbox>
        <Text style={styles.nickNameFont}>{item.nickName}</Text>
      </View>
      <View>
        <Text style={styles.idFont}>#{item.id}</Text>
      </View>
    </View>
  );
});

TagFriendListItem.displayName = 'TagFriendListItem';

TagFriendListItem.propTypes = {
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
  nickNameFont: {
    fontSize: 14,
    fontWeight: 500,
    color: BLACK,
    paddingRight: 8,
    paddingLeft: 16,
  },
  idFont: {
    fontSize: 10,
    fontWeight: 500,
    color: GRAY[400],
  },
  checkBox: {
    width: 24,
    height: 24,
  },
});

export default TagFriendListItem;
