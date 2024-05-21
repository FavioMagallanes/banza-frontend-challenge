import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
      <Text style={styles.inputSearchMessage}>
        Note: Search is only available for artist names.
      </Text>

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
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 26,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.text,
  },
  search: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 20,
  },
  inputSearchMessage: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 8,
    marginLeft: 8,
  },
  field: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 8,
    color: theme.colors.primary,
  },
});
