import React, { FC, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import ArtworksContext from '../../context/art-work-context';
import useFavoriteArtworks from '../../hooks/use-favorites-art-works';
import ArtWorkFavoritesList from '../../components/art-work-favorites-list/art-work-favorites-list';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { IconComponent } from '../../components/icon/icon';

const ArtWorksFavoritesScreen: FC = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavoriteArtworks();
  const { artworks } = useContext(ArtworksContext)!;
  const [numColumns, setNumColumns] = useState(1);
  const navigation = useNavigation();
  const favoritesWithData = artworks.filter(artwork => favorites.includes(artwork.id.toString()));

  useEffect(() => {
    setNumColumns(favorites.length > 1 ? 2 : 1);
  }, [favorites]);

  const handleRemoveFavorite = async (id: number) => await removeFavorite(id.toString());
  const handleClearFavorites = async () => await clearFavorites();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <IconComponent name="arrow-back" size={24} color={theme.colors.primary} />
        </Pressable>
        {favoritesWithData.length > 0 && (
          <Pressable onPress={handleClearFavorites}>
            <Text style={styles.clearButton}>Clear list</Text>
          </Pressable>
        )}
      </View>
      {favoritesWithData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconComponent name="heart-dislike-outline" size={48} color={theme.colors.placeholder} />
          <Text style={styles.emptyMessage}>No favorites found.</Text>
        </View>
      ) : (
        <ArtWorkFavoritesList
          data={favoritesWithData}
          numColumns={numColumns}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.text,
    marginTop: 16,
  },
  clearButton: {
    fontSize: 16,
    color: theme.colors.primary,

    paddingVertical: 4,
    paddingHorizontal: 18,
    marginLeft: 8,
  },
});

export default ArtWorksFavoritesScreen;
