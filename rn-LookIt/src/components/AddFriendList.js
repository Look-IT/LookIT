//받은 & 보낸 친구 요청 리스트

import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import AddFriendListItem from './AddFriendListItem';
import SendFriendListItem from './SendFriendListItem';

const AddFriendList = ({ data }) => {
  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={1}
      data={data}
      keyExtractor={(item) => item.tagId.toString()}
      renderItem={({ item }) => <AddFriendListItem item={item} />}
    ></FlatList>
  );
};

AddFriendList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AddFriendList;
