import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <StatusBar style="darl"></StatusBar>
      <Text style={{ fontSize: 30 }}>LookIT App</Text>
    </View>
  );
};

export default App;
