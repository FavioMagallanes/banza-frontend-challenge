import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import { ArtworkScreenProps } from '../../types/navigation-types';
import { Hero } from '../../components/ui/hero';
import SearchInput from '../../components/search-input/search-input';
import SearchTab from '../../components/search-tab/search-tab';

const ArtworkScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const handleTabChange = (key: string) => setActiveTab(key);

  return (
    <View style={styles.container}>
      <Hero />
      <SearchInput />
      <SearchTab
        tabs={[
          { key: 'all', label: 'All' },
          { key: 'painting', label: 'Painting' },
          { key: 'sculpture', label: 'Sculpture' },
          { key: 'photography', label: 'Photography' },
        ]}
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ArtworkScreen;
