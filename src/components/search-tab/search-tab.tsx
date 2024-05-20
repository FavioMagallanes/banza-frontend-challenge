import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Tab from '../tab/tab';

type Tab = {
  key: string;
  label: string;
};

type Props = {
  tabs: Tab[];
  activeTab: string;
  onChangeTab: (key: string) => void;
};

const SearchTab: FC<Props> = ({ tabs, activeTab, onChangeTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <Tab
          key={tab.key}
          label={tab.label}
          isActive={activeTab === tab.key}
          onPress={() => onChangeTab(tab.key)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default SearchTab;
