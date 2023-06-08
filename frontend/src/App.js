import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations/Navigation.js';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Toast from 'react-native-toast-message';
import { BaseToast } from 'react-native-toast-message';
import { GRAY, WHITE } from './colors';
import { MemoriesProvider } from './contexts/MemoriesContext';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
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
};

const App = () => {
  return (
    <ActionSheetProvider>
      <UserProvider>
        <MemoriesProvider>
          <StatusBar style="dark" />
          <Navigation />
          <Toast config={toastConfig}></Toast>
        </MemoriesProvider>
      </UserProvider>
    </ActionSheetProvider>
  );
};

export default App;
