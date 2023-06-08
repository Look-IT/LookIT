//그냥 친구 목록 컴포넌트

import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK } from '../colors';
import { useNavigation } from '@react-navigation/core';

const FriendListItem = memo(({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable 
      style={({ pressed }) => [
        pressed && { backgroundColor: GRAY['50'] }
      ]}
      onPress={() => {
        navigation.navigate(
        'FriendMemoriesListScreen', {
          item
        })
      }}>
      <View style={styles.container}>
        <Text style={styles.nickNameFont}>{item.nickName}</Text>
        <Text style={styles.idFont}>#{item.id}</Text>
      </View>
    </Pressable>
  );
});

FriendListItem.displayName = 'FriendListItem';

FriendListItem.propTypes = {
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
  },
  idFont: {
    fontSize: 10,
    fontWeight: 500,
    color: GRAY[400],
  },
});

export default FriendListItem;
