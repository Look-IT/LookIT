//받은 & 보낸 친구 요청 리스트

import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import SendFriendListItem from './SendFriendListItem';

const SendFriendList = ({ data, ListHeaderComponent, reset }) => {
  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={1}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SendFriendListItem item={item} reset={reset} />
      )}
      ListHeaderComponent={ListHeaderComponent}
    ></FlatList>
  );
};

SendFriendList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SendFriendList;
