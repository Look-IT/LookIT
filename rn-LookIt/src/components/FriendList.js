import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import FriendListItem from './FriendListItem';

const FriendList = ({ data }) => {
  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={1}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <FriendListItem item={item} />}
    ></FlatList>
  );
};

FriendList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FriendList;
