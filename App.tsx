import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ArtworksProvider } from './src/context/art-work-context';
import { DrawerNavigator } from './src/navigation/drawer-navigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View style={styles.root}>
      <GestureHandlerRootView>
        <ArtworksProvider>
          <DrawerNavigator />
          <Toast />
        </ArtworksProvider>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    fontFamily: 'Montserrat',
  },
});
