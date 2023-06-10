// `내 프로필` 탭 추억일지 리스트 아이템 컴포넌트

import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, PRIMARY } from '../colors';
import { Body, Family, Label } from "../styles/fonts";
import FriendTagButton from './FriendTagButton';
import { useNavigation } from '@react-navigation/core';
import { getTagFriendList } from '../api/DiaryApi';

const DiaryListItem = ({ item }) => {

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

    <View style={styles.container}>

      <View style={styles.margeHorizontal}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      <Pressable onPress={handleMemoriesView}>
        <View style={[
            styles.imageContainer,
            !item.thumbnail && styles.imageTextContainer
          ]}>
          {
            item.thumbnail
              ? <Image
                  style={styles.image}
                  source={{ uri: item.thumbnail }}/>
              : <Text style={styles.imageText}>{'업로드된 사진이 존재하지 않습니다'}</Text>
          }
          <View style={styles.friendTagContainer}>
            <FriendTagButton
              tagFriend={friendTags}/>
          </View>
        </View>
      </Pressable>

      <View style={[styles.margeHorizontal, styles.hashTagContainer]}>
        {
          item.tag.map((tagitems, index) => {
            const tagitem = Object.entries(tagitems)
              .map(([_, value]) => value)
              .join(", ");

            return (
              <View key={index} style={styles.hashTagBox}>
                <Text style={{ color: PRIMARY.DEFAULT }}>#{tagitem} </Text>
              </View>
            )
          })
        }
      </View>
      
    </View>
  );
};

DiaryListItem.displayName = 'DiaryListItem';

DiaryListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    marginBottom: 16,
  },
  dateText: {
    ...Family.KR_Regular,
    ...Body.Medium,
  },
  imageContainer: {
    width: '100%',
    height: 176,
    marginVertical: 8,
    borderTopWidth: 1,
    borderColor: GRAY['200'],
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
  imageTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY['100'],
  },
  imageText: {
    ...Family.KR_Medium,
    ...Label.Medium,
    color: GRAY['500'],
  },
  margeHorizontal: {
    marginHorizontal: 16,
  },
  friendTagContainer: {
    position: 'absolute',
    right: 16,
    bottom: 8
  },
  hashTagContainer: {
    flexDirection: 'row',
    columnGap: 8,
    rowGap: 4,
    flexWrap: 'wrap',
  },
});

export default DiaryListItem;
