//일반 친구 리스트

import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import FriendListItem from './FriendListItem';

const FriendList = ({ data, ListHeaderComponent }) => {
  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={1}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <FriendListItem item={item} />}
      ListHeaderComponent={ListHeaderComponent}
    ></FlatList>
  );
};

FriendList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FriendList;
