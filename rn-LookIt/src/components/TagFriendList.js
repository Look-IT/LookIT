//일반 친구 리스트

import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import TagFriendListItem from './TagFriendListItem';

const TagFriendList = ({ data, taggedFriend, setTaggedFriend }) => {
  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={2}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TagFriendListItem
          item={item}
          setTaggedFriend={setTaggedFriend}
          taggedFriend={taggedFriend}
        />
      )}
    ></FlatList>
  );
};

TagFriendList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TagFriendList;
