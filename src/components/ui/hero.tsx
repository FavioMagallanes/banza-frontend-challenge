import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const Hero = () => {
  return (
    <View>
      <Text style={styles.title}>Welcome to Art Institute of Chicago</Text>
      <Text style={styles.subtitle}>
        Search for your favorite art pieces and save them to your collection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#556089',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
});
