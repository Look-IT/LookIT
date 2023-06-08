//그냥 친구 목록 컴포넌트

import { memo, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, WHITE, PRIMARY } from '../colors';
import FriendTagButton from './FriendTagButton';
import { useNavigation } from '@react-navigation/core';
import { getTagFriendList } from '../api/DiaryApi';

const DiaryListItem = ({ item }) => {
  const date = item.date.split('T');

  const navigation = useNavigation();
  const [memoryId, setMemoryId] = useState(null);
  const [friendTags, setFriendTags] = useState([]);

  handleMemoriesView = () => {
    setMemoryId(item.id);
  }

  useEffect(() => {
    getTagFriendList(item.id)
      .then(response => setFriendTags(response))
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    memoryId && navigation.navigate('MemoriesViewScreen', { memoryId });
    setMemoryId(null);
  }, [memoryId]);


  return (
    <Pressable
      onPress={handleMemoriesView}>

      <View style={styles.container}>
        <View style={[styles.textContainer, { height: 28, paddingBottom: 8 }]}>
          <Text style={{ fontSize: 14 }}>{date[0] + ' ' + date[1]}</Text>
        </View>
        <View style={styles.imageContainer}>
          {
            item.thumbnail &&
              <Image style={styles.image} source={{ uri: item.thumbnail }}></Image>
          }

          <View style={styles.friendTag}>
            <FriendTagButton
              tagFriend={friendTags}/>
          </View>
        </View>

        <View
          style={[
            styles.textContainer,
            { height: 24, paddingTop: 8, fontSize: 14 },
          ]}
        >
          
          {
            item.tag.map((tagitems, index) => {
              const tagitem = Object.entries(tagitems)
                .map(([_, value]) => value)
                .join(", ");

              return (
                <View key={index} style={{ height: 26 }}>
                  <Text style={{ color: PRIMARY.DEFAULT }}>#{tagitem} </Text>
                </View>
              )
            })
          }

          {/* 
          {item.tag.map((tagitem, index) => {
            return (
              <View key={index} style={{ height: 26 }}>
                <Text style={{ color: PRIMARY.DEFAULT }}>#{tagitem} </Text>
              </View>
            );
          })} */}
        </View>
      </View>
    </Pressable>
  );
};

DiaryListItem.displayName = 'DiaryListItem';

DiaryListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 228,

    alignItems: 'center',
    backgroundColor: GRAY.DEFAULT,
    marginBottom: 16,
  },

  imageContainer: {
    width: '100%',
    height: 176,
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: 176,
    resizeMode: 'contain',
  },
  friendTag: {
    position: 'absolute',
    left: '89.33%',
    bottom: 8,
  },
  textContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: WHITE,
    alignItems: 'center',
  },
});

export default DiaryListItem;