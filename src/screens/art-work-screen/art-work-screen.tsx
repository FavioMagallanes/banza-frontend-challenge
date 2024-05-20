import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { ArtworkScreenProps } from '../../types/navigation-types';
import { Header } from '../../components/ui/header';
import { Hero } from '../../components/ui/hero';

const ArtworkScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Hero />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ArtworkScreen;
