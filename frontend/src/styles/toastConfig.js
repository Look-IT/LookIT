import { BaseToast } from 'react-native-toast-message';
import { DANGER, GRAY, WHITE } from '../colors';

const toastConfig = {

  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'transparent',
        backgroundColor: GRAY[800],
        height: 48,
        borderRadius: 4,
        borderLeftWidth: 0,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        marginBottom: 20,
        marginHorizontal: 16,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: WHITE,
        fontWeight: '500',
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'transparent',
        backgroundColor: DANGER[700],
        height: 48,
        borderRadius: 4,
        borderLeftWidth: 0,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        marginBottom: 20,
        marginHorizontal: 16,
        zIndex: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: WHITE,
        fontWeight: '500',
      }}
    />
  ),
};

export default toastConfig;