import { Alert, StyleSheet, View } from 'react-native';
import { GRAY } from '../colors';
import List from '../components/List';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputFab from '../components/InputFab.js';
import { useEffect, useState } from 'react';
//import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const FriendListScreen = ({ navigation, route }) => {
  const { bottom } = useSafeAreaInsets(); //기기별 화면 아래쪽 가려지는 것 방지를 위한 상태변수
  const [friend, setFriend] = useState([]); //친구 정보를 담은 상태 변수

  const [isBottom, setIsBottom] = useState(false);

  const [ReceiveListExpand, setReceiveListExpand] = useState(false);
  const [SendListExpand, setSendListExpand] = useState(false);
  const [FriendListExpand, setFriendListExpand] = useState(false);
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
  const onPressExpand = (isExpand) => {
    switch (isExpand) {
      case ReceiveListExpand:
        setReceiveListExpand(!ReceiveListExpand);
        return;
      case SendListExpand:
        setSendListExpand(!SendListExpand);
        return;
      case FriendListExpand:
        setFriendListExpand(!FriendListExpand);
        return;
      default:
        return;
    }
  };

  const onInsert = (task) => {
    const id = Date.now().toString();
    const newfriend = [{ id, task, isDone: false }, ...friend];
    setFriend(newfriend);
    //save(newfriend);
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <View style={styles.list}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    borderBottomColor: { GRAY },
  },
});

export default FriendListScreen;
