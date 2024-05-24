import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconComponent } from '../icon/icon';
import { TextInput } from 'react-native-gesture-handler';
import { theme } from '../../../theme';

type InputSearchProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
};

export const SearchInput: FC<InputSearchProps> = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.field}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.searchContainer}>
          <IconComponent name="search" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  field: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 8,
    paddingRight: 40,
    paddingVertical: 8,
    color: theme.colors.primary,
  },
});
