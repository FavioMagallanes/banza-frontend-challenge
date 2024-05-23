import React, { FC, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import ArtworksContext from '../../context/art-work-context';
import useFavoriteArtworks from '../../hooks/use-favorites-art-works';
import ArtWorkFavoritesList from '../../components/art-work-favorites-list/art-work-favorites-list';
import { theme } from '../../../theme';

const ArtWorksFavoritesScreen: FC = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavoriteArtworks();
  const { artworks } = useContext(ArtworksContext)!;
  const [numColumns, setNumColumns] = useState(1);

  const favoritesWithData = artworks.filter(artwork => favorites.includes(artwork.id.toString()));

  useEffect(() => {
    setNumColumns(favorites.length > 1 ? 2 : 1);
  }, [favorites]);

  const handleRemoveFavorite = async (id: number) => await removeFavorite(id.toString());

  const handleClearFavorites = async () => await clearFavorites();

  if (favoritesWithData.length === 0) {
    return (
      <View style={styles.emptyMessageContainer}>
        <Text style={styles.emptyMessage}>No favorites found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleClearFavorites}>
          <Text style={styles.clearButton}>Clear All</Text>
        </Pressable>
      </View>
      <ArtWorkFavoritesList
        data={favoritesWithData}
        numColumns={numColumns}
        handleRemoveFavorite={handleRemoveFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.text,
  },
  clearButton: {
    fontSize: 16,
    color: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 18,
    marginLeft: 8,
    backgroundColor: theme.colors.surface,
  },
});

export default ArtWorksFavoritesScreen;
