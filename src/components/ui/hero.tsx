import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme';

export const Hero = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Art Institute of Chicago</Text>
      <Text style={styles.subtitle}>
        Search for your favorite art pieces and save them to your collection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    color: theme.colors.text,
  },
});
