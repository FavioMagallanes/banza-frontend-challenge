import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconComponent } from '../icon/icon';
import { TextInput } from 'react-native-gesture-handler';
import { theme } from '../../../theme';

type InputSearchProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
};

const InputSearch: FC<InputSearchProps> = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.field}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          onChangeText={onChangeText}
        />
        <View style={styles.search}>
          <IconComponent name="search" size={24} color={theme.colors.primary} />
        </View>
      </View>
    </View>
  );
};
export default InputSearch;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    backgroundColor: 'transparent',
    padding: 8,
  },

  field: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 8,
    color: theme.colors.primary,
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
  },
});
