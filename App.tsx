import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/app-navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from './theme';

export default function App() {
  return (
    <View style={styles.root}>
      <GestureHandlerRootView>
        <AppNavigator />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    fontFamily: 'Montserrat',
  },
});
