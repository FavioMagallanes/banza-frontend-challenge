import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { IconComponent } from '../icon/icon';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

export const GoBackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.backButton}>
      <Pressable onPress={() => navigation.goBack()}>
        <IconComponent name="arrow-back" size={20} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 35,
    left: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    padding: 10,
  },
});
