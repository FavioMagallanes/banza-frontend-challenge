import React, { FC, useContext, useState } from 'react';
import ArtworksContext from '../../context/art-work-context';
import { useFilteredArtworks } from '../../hooks/use-filtered-art-works';
import { useFavorites } from '../../hooks/use-favorites';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { Hero } from '../../components/ui/hero';
import SearchInput from '../../components/search-input/search-input';
import SearchTab from '../../components/search-tab/search-tab';
import ArtworkCardsList from '../../components/art-work-cards-list/art-work-cards-list';
import { theme } from '../../../theme';
import { tabs } from '../../constants/tabs';
import { handleAddArtWorkToFavorites } from '../../utils/helpers';

const ArtworkScreen: FC = () => {
  const { artworks, loading, error } = useContext(ArtworksContext)!;
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const filteredArtworks = useFilteredArtworks(artworks, activeTab, searchQuery);

  const handleTabChange = (key: string) => setActiveTab(key);
  const handleSearch = (query: string) => setSearchQuery(query);

  const handleFavoritePress = async (id: string) =>
    await handleAddArtWorkToFavorites(id, favorites, addFavorite, removeFavorite);

  if (loading) {
    return <ActivityIndicator style={styles.spinner} size="large" color={theme.colors.primary} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Hero />
      <SearchInput placeholder="Search by artist name" onChangeText={handleSearch} />
      <SearchTab tabs={tabs} activeTab={activeTab} onChangeTab={handleTabChange} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ArtworkCardsList
        artworks={filteredArtworks}
        favorites={favorites}
        onFavoritePress={handleFavoritePress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  spinner: {
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ArtworkScreen;
