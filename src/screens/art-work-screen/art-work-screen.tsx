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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const { filterArtworks } = useFilterArtworks();
  const { artworks, filteredArtworks, setFilteredArtworks, loading } =
    useInitialDataLoader(activeTab);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const filtered = filterArtworks(artworks, key, searchQuery);
    setFilteredArtworks(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = filterArtworks(artworks, activeTab, query);
    setFilteredArtworks(filtered);
  };

  const handleFavoritePress = (id: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Hero />
      <SearchInput placeholder="Search by artist name" onChangeText={handleSearch} />
      <SearchTab
        tabs={[
          { key: 'all', label: 'All' },
          { key: 'engraving', label: 'Engraving' },
          { key: 'sculpture', label: 'Sculpture' },
          { key: 'painting', label: 'Painting' },
        ]}
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
      {loading ? (
        <ActivityIndicator style={styles.spinner} size="large" color={theme.colors.primary} />
      ) : (
        <ArtworkCardsList
          artworks={filteredArtworks}
          favorites={favorites}
          onFavoritePress={handleFavoritePress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchMessage: {
    marginVertical: 10,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  spinner: {
    flex: 1,
  },
});

export default ArtworkScreen;
