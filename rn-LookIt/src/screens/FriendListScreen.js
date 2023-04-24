import { Alert, StyleSheet, View } from 'react-native';

import List from '../components/List';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputFab from '../components/InputFab.js';
import { useEffect, useState } from 'react';
//import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const FriendListScreen = ({ navigation, route }) => {
  const { bottom } = useSafeAreaInsets();
  const [friend, setFriend] = useState([]);

  const [isBottom, setIsBottom] = useState(false);

  //const { getItem, setItem } = useAsyncStorage('');
  /*
  const save = async (data) => {
    try {
      await setItem(JSON.stringify(data));
      setFriend(data);
    } catch (e) {
      Alert.alert('저장하기 실패', '데이터 저장에 실패했습니다.');
    }
  };

  const load = async () => {
    try {
      const data = await getItem();
      const friend = JSON.parse(data || '[]');
      setFriend(friend);
    } catch (e) {
      Alert.alert('불러오기 실패', '데이터 불러오기에 실패하였습니다.');
    }
  };

  const onDelete = (id) => {
    const newfriend = friend.filter((item) => item.id !== id);
    save(newfriend);
  };

  useEffect(() => {
    load();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/
  const onInsert = (task) => {
    const id = Date.now().toString();
    const newfriend = [{ id, task, isDone: false }, ...friend];
    setFriend(newfriend);
    //save(newfriend);
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <List data={friend} setIsBottom={setIsBottom} onDelete={() => {}}></List>
      {!isBottom ? (
        <InputFab onInsert={onInsert} isBottom={isBottom}></InputFab>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    //alignItems: 'center',
  },
});

export default FriendListScreen;
