import React, { FC } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { theme } from '../../../theme';
import { Data } from '../../interfaces/response-data';
import ArtWorkCard from '../art-work-card/art-work-card';

interface ArtworkCardsListProps {
  artworks: Data[];
  favorites: string[];
  onFavoritePress: (id: string) => void;
}

const ArtworkCardsList: FC<ArtworkCardsListProps> = ({ artworks, favorites, onFavoritePress }) => {
  const getItemCount = () => artworks.length;
  const getItem = (data: Data[], index: number) => data[index];

  return artworks.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No artworks found.</Text>
    </View>
  ) : (
    <VirtualizedList<Data>
      data={artworks}
      renderItem={({ item, index }) => (
        <ArtWorkCard
          key={`${item.id}-${index}`}
          id={item.id}
          title={item.title}
          image={
            item.image_id
              ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
              : 'https://via.placeholder.com/843x475.png?text=No+Image'
          }
          provenanceText={item.provenance_text ?? ''}
          description={item.short_description}
          altText={item.thumbnail?.alt_text}
          artist_title={item.artist_title}
          classification_title={item.classification_title}
          onFavoritePress={() => onFavoritePress(item.id.toString())}
          isFavorite={favorites.includes(item.id.toString())}
        />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      getItemCount={getItemCount}
      getItem={(data, index) => getItem(data, index)}
      contentContainerStyle={{ paddingHorizontal: 18 }}
      style={styles.flatList}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.text,
  },
});

export default ArtworkCardsList;
