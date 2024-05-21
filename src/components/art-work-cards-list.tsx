import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import { Data } from '../interfaces/response-data';
import ArtWorkCard from './art-work-card/art-work-card';

interface ArtworkCardsListProps {
  artworks: Data[];
}

const ArtworkCardsList: FC<ArtworkCardsListProps> = ({ artworks }) => {
  return artworks.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No artworks found.</Text>
    </View>
  ) : (
    <FlatList
      data={artworks}
      renderItem={({ item, index }) => (
        <ArtWorkCard
          key={`${item.id}-${index}`}
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
        />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      contentContainerStyle={{ paddingHorizontal: 18 }}
      style={styles.flatList}
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
