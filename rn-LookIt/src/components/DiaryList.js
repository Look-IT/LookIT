//일반 친구 리스트

import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DiaryListItem from './DiaryListItem';

const DiaryList = ({ data }) => {
  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={1}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <DiaryListItem item={item} />}
    ></FlatList>
  );
};

DiaryList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DiaryList;
