// 추억일지 경로 추적 시작 및 종료 플로팅 버튼 컴포넌트

import { Pressable, Text, StyleSheet, Image } from "react-native"

import { PRIMARY, DANGER, WHITE } from "../../colors";
import { Family, Label } from "../../styles/fonts";
import { useState } from "react";
import { useLocationTracking } from "../navermap/functions/WatchingLocation";
import VIForegroundService from '@voximplant/react-native-foreground-service';

const MemoriesFloatingButton = ({activation, onPress}) => {
  const [shouldTrack, setShouldTrack] = useState(false); // 경로 추적 관리 변수

  // 경로 추적 함수
  useLocationTracking(shouldTrack, true);
  
  const handleForeground = async () => {

    const notificationConfig = {
      channelId: 'default',
      id: 1,
      title: '추억 경로 기록',
      text: '추억을 기록하는 중입니다',
      icon: 'ic_launcher_foreground',
      priority: 3,
    };
    try {
      if (activation) {
        await VIForegroundService.getInstance().stopService();
      } else {
        await VIForegroundService.getInstance().startService(notificationConfig);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Pressable
      onPress={() => {
        onPress();
        setShouldTrack(prev => !prev);
        handleForeground();
      }}
      style={[styles.buttonContainer, {
        backgroundColor: activation ? DANGER[400] : PRIMARY[700]
      }]}
    >
      <Image
        source={
          activation
            ? require('../../../assets/Icon_Stop.png')
            : require('../../../assets/Icon_Guide.png')
        }
        style={styles.ButtonIconStyle}
      />
      <Text
        style={[styles.text]}>
        { activation ? '기록 종료' :  '경로 기록' }
      </Text>
    </Pressable>
  )
};

MemoriesFloatingButton.defaultProps = {
  activation: false,
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 22,
    position: 'absolute',
    bottom: 24,
  },
  text: {
    ...Family.KR_Medium,
    ...Label.Large,
    color: WHITE,
  },
  ButtonIconStyle: {
    resizeMode: 'contain',
    width: 18,
    height: 18,
    marginRight: 12,
    marginVertical: 14,
  }
})

export default MemoriesFloatingButton;