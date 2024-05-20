import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconComponent } from '../icon/icon';
import { theme } from '../../../theme';

export const Header = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <IconComponent
            name="brush-outline"
            size={30}
            color={theme.colors.background}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    alignItems: 'flex-end',
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
