/* eslint-disable react/no-unstable-nested-components */
import React, { FC, useContext, useEffect, useState } from 'react';
import ArtworksContext from '../../context/art-work-context';
import { useFilteredArtworks } from '../../hooks/use-filtered-art-works';
import { useFavorites } from '../../hooks/use-favorites';
import { StyleSheet, SafeAreaView, Text, Pressable } from 'react-native';
import { tabs } from '../../constants/tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { IconComponent } from '../../components/icon/icon';
import { ArtworkCardsList } from '../../components/art-work-cards-list/art-work-cards-list';
import { SearchInput } from '../../components/search-input/search-input';
import { SearchTab } from '../../components/search-tab/search-tab';
import { LoaderAnimation } from '../../components/ui/loader-animation';
import { theme } from '../../../theme';

export const ArtworkScreen: FC = () => {
  const { artworks, loading, error } = useContext(ArtworksContext)!;
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { favorites, handleAddArtWorkToFavorites } = useFavorites();
  const filteredArtworks = useFilteredArtworks(artworks, activeTab, searchQuery);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
          <IconComponent name="menu" size={24} color={theme.colors.primary} />
        </Pressable>
      ),
      headerShown: !loading,
    });
  }, [navigation, loading]);

  const handleTabChange = (key: string) => setActiveTab(key);
  const handleSearch = (query: string) => setSearchQuery(query);

  const handleFavoritePress = async (id: string) => {
    await handleAddArtWorkToFavorites(id);
  };

  if (loading) {
    return <LoaderAnimation />;
  }

  return (
    <SafeAreaView style={styles.container}>
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
