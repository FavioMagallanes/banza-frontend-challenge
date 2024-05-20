import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Header = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Icon name="brush-outline" size={30} color="#e3deee" />
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
    backgroundColor: '#556089',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
