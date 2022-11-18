import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigator from './Source/Routes'
import { Provider, useDispatch } from 'react-redux';
import Store from './Source/Redux_Stores/Store';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreLogs(["Sending"]);
LogBox.ignoreLogs(['Task orphaned']);

export default function App() {

  if (Platform.OS == 'ios') {
    return (
      <SafeAreaProvider >
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={Store}>
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaProvider >
        <Provider store={Store}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
