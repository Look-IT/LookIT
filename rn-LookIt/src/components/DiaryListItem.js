//그냥 친구 목록 컴포넌트

import { memo } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { GRAY, BLACK, WHITE, PRIMARY } from '../colors';

const DiaryListItem = memo(({ item }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.textContainer, { height: 28, paddingBottom: 8 }]}>
        <Text style={{ fontSize: 14 }}>{item.date}</Text>
      </View>

      <Image
        style={styles.imageContainer}
        source={require('../../assets/main.png')}
      ></Image>

      <View
        style={[
          styles.textContainer,
          { height: 24, paddingTop: 8, fontSize: 14 },
        ]}
      >
        {item.tag.map((tagitem, index) => {
          return (
            <View key={index} style={{ height: 26 }}>
              <Text style={{ color: PRIMARY.DEFAULT }}>#{tagitem} </Text>
            </View>
          );
        })}
      </View>
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
    backgroundColor: GRAY.DEFAULT,
    marginBottom: 16,
  },

  imageContainer: {
    height: 176,
    resizeMode: 'contain',
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
