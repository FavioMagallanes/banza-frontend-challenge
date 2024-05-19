import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <Text style={styles.title}>
        Welcome to Art Institute of Chicago Mobile App!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat',
  },
  title: {
    fontSize: 14,
    fontWeight: 'regular',
  },
});
