import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'; // Import the Text component from react-native
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ArtworksProvider } from './src/context/art-work-context';
import { DrawerNavigator } from './src/navigation/drawer-navigator';
import Toast from 'react-native-toast-message';
import { LoaderAnimation } from './src/components/ui/loader-animation';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.root}>
      <GestureHandlerRootView>
        {isLoading ? (
          <LoaderAnimation />
        ) : (
          <ArtworksProvider>
            <DrawerNavigator />
            <Toast />
          </ArtworksProvider>
        )}
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    fontFamily: 'Montserrat',
  },
  cargando: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    color: 'black',
  },
});
