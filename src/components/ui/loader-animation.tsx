import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { theme } from '../../../theme';
import { IconComponent } from '../icon/icon';

export const LoaderAnimation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.loaderContainer}>
        <Animatable.View animation="pulse" iterationCount="infinite" style={styles.icon}>
          <IconComponent name="color-palette-outline" size={170} color="#FFFFFF" />
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.primary,
    opacity: 0.5,
  },
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 20,
  },
});
