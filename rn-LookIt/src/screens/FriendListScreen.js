import { Alert, StyleSheet, View } from 'react-native';

import List from '../components/List';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useEffect, useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const FriendListScreen = ({ navigation, route }) => {
  const { bottom } = useSafeAreaInsets();
  const [todos, setTodos] = useState([]);

  const [isBottom, setIsBottom] = useState(false);

  const { getItem, setItem } = useAsyncStorage('');

  const save = async (data) => {
    try {
      await setItem(JSON.stringify(data));
      setTodos(data);
    } catch (e) {
      Alert.alert('저장하기 실패', '데이터 저장에 실패했습니다.');
    }
  };

  const load = async () => {
    try {
      const data = await getItem();
      const todos = JSON.parse(data || '[]');
      setTodos(todos);
    } catch (e) {
      Alert.alert('불러오기 실패', '데이터 불러오기에 실패하였습니다.');
    }
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    save(newTodos);
  };

  useEffect(() => {
    load();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInsert = (task) => {
    const id = Date.now().toString();
    const newTodos = [{ id, task, isDone: false }, ...todos];
    save(newTodos);
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <List data={todos} setIsBottom={setIsBottom} onDelete={onDelete}></List>
      {!isBottom ? (
        <InputFAB onInsert={onInsert} isBottom={isBottom}></InputFAB>
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
