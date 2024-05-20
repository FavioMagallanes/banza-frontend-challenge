import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { theme } from '../../../theme';

type TabProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const Tab: FC<TabProps> = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    color: theme.colors.primary,
  },
  activeTabText: {
    color: 'white',
  },
});

export default Tab;
