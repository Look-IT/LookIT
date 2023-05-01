//받은 & 보낸 친구 요청 리스트

import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import RequestFriendListItem from './RequestFriendListItem';

const RequestFriendList = ({ data, ListHeaderComponent }) => {
  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={1}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RequestFriendListItem item={item} />}
      ListHeaderComponent={ListHeaderComponent}
    ></FlatList>
  );
};

RequestFriendList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RequestFriendList;
