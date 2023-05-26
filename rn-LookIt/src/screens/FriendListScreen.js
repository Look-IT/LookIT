import {
  Alert,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { GRAY, WHITE } from '../colors';
import ExpandButton from '../components/ExpandButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputFab from '../components/InputFab.js';
import { useEffect, useState } from 'react';
import FriendList from '../components/FriendList';
import RequestFriendList from '../components/RequestFriendList';
import SendFriendList from '../components/SendFriendList';
//import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const FriendListScreen = ({ navigation, route }) => {
  const { bottom } = useSafeAreaInsets(); //기기별 화면 아래쪽 가려지는 것 방지를 위한 상태변수

  const [myAccount, setMyAccount] = useState({
    myNickName: '김효진',
    myId: '4545',
  }); //내 계정 정보를 담은 상태 변수

  const [receiveFriend, setReceiveFriend] = useState([
    { id: '123', nickName: '임민호' },
    { id: '223', nickName: '임민호' },
    { id: '323', nickName: '임민호' },
  ]); //받은 친구 요청 정보를 담은 상태 변수

  const [sendFriend, setSendFriend] = useState([
    { id: '123', nickName: '임민호' },
    { id: '223', nickName: '임민호' },
    { id: '323', nickName: '임민호' },
  ]); //보낸 친구 요청 정보를 담은 상태 변수

  const [friend, setFriend] = useState([
    { id: '123', nickName: '임민호' },
    { id: '223', nickName: '임민호' },
    { id: '323', nickName: '임민호' },
    { id: '423', nickName: '임민호' },
    { id: '523', nickName: '임민호' },
  ]); //친구 정보를 담은 상태 변수

  const [isBottom, setIsBottom] = useState(false); // 화면 가림 방지 위한 상태변수

  const [ReceiveListExpand, setReceiveListExpand] = useState(false); // 받은 친구 요청 리스트 확장 / 축소 관련 상태 변수
  const [SendListExpand, setSendListExpand] = useState(false); // 보낸 친구 요청 리스트 확장 / 축소 관련 상태 변수
  const [FriendListExpand, setFriendListExpand] = useState(false); // 친구 리스트 확장 / 축소 관련 상태 변수

  const onPressExpand = (whatTypeExpand) => {
    // 각 리스트 터치시 확장 / 축소 변수를 컨트롤 하는 함수
    console.log(ReceiveListExpand);
    console.log(whatTypeExpand);
    switch (whatTypeExpand) {
      case 'ReceiveListExpand':
        setReceiveListExpand(!ReceiveListExpand);

        return;
      case 'SendListExpand':
        setSendListExpand(!SendListExpand);
        return;
      case 'FriendListExpand':
        setFriendListExpand(!FriendListExpand);
        return;
      default:
        return;
    }
  };

  return (
    <View style={[styles.container, { paddingHorizontal: 16 }]}>
      <FriendList
        data={friend}
        ListHeaderComponent={
          <>
            <View
              style={{
                height: 56,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={[styles.text, { fontSize: 14 }]}>
                {myAccount.myNickName}
              </Text>
              <Text style={[styles.text, { fontSize: 10, color: GRAY[400] }]}>
                #{myAccount.myId}
              </Text>
            </View>

            <Pressable onPress={() => onPressExpand('ReceiveListExpand')}>
              <View style={styles.list}>
                <Text style={[styles.text, { fontSize: 10 }]}>
                  받은 친구 요청
                </Text>
                <ExpandButton isExpand={ReceiveListExpand}></ExpandButton>
              </View>
            </Pressable>
            {ReceiveListExpand && (
              <RequestFriendList data={receiveFriend}></RequestFriendList>
            )}

            <Pressable onPress={() => onPressExpand('SendListExpand')}>
              <View style={styles.list}>
                <Text style={[styles.text, { fontSize: 10 }]}>
                  보낸 친구 요청
                </Text>
                <ExpandButton isExpand={SendListExpand}></ExpandButton>
              </View>
            </Pressable>
            {SendListExpand && (
              <SendFriendList data={sendFriend}></SendFriendList>
            )}
            <View style={styles.list}>
              <Text style={[styles.text, { fontSize: 10 }]}>친구</Text>
            </View>
          </>
        }
      ></FriendList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  scrollContainer: { flexGrow: 1, backgroundColor: WHITE },
  list: {
    flexDirection: 'row',
    height: 48,
    borderTopWidth: 1,
    borderColor: GRAY[200],
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },

  text: {
    fontWeight: 500,
    lineHeight: 16,
  },
});

export default FriendListScreen;
