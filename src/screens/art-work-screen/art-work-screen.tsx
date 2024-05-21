import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Hero } from '../../components/ui/hero';
import SearchInput from '../../components/search-input/search-input';
import SearchTab from '../../components/search-tab/search-tab';
import ArtworkCardsList from '../../components/art-work-cards-list';
import useFilterArtworks from '../../hooks/use-filter-art-works';
import useInitialDataLoader from '../../hooks/use-initial-data-loader';
import { ActivityIndicator } from 'react-native';
import { theme } from '../../../theme';

const ArtworkScreen = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { filterArtworks } = useFilterArtworks();
  const { artworks, filteredArtworks, setFilteredArtworks, loading } =
    useInitialDataLoader(activeTab);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const filtered = filterArtworks(artworks, key);
    setFilteredArtworks(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Hero />
      <SearchInput />
      <SearchTab
        tabs={[
          { key: 'all', label: 'All' },
          { key: 'engraving', label: 'Engraving' },
          { key: 'sculpture', label: 'Sculpture' },
          { key: 'book', label: 'Book' },
        ]}
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <ArtworkCardsList artworks={filteredArtworks} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ArtworkScreen;
