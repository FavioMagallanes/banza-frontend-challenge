import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from './src/components/ui/header';
import {Hero} from './src/components/ui/hero';

export default function App() {
  return (
    <>
      <View style={styles.root}>
        <Header />
        <Hero />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f3f3',
    fontFamily: 'Montserrat',
  },
});
