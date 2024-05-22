import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/app-navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from './theme';
import { ArtworksProvider } from './src/art-work-context';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View style={styles.root}>
      <GestureHandlerRootView>
        <ArtworksProvider>
          <AppNavigator />
          <Toast />
        </ArtworksProvider>
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
