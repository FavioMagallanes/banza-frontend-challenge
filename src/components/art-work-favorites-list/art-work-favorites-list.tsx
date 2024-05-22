import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { Data } from '../../interfaces/response-data';
import { ArtWorkFavoritesCard } from '../art-work-favorites-card-list/art-work-favorites-card';

interface ArtWorkFavoritesListProps {
  data: Data[];
  numColumns: number;
  handleRemoveFavorite: (id: number) => void;
}

const ArtWorkFavoritesList: FC<ArtWorkFavoritesListProps> = ({
  data,
  numColumns,
  handleRemoveFavorite,
}) => {
  return (
    <FlatList
      key={`${numColumns}`}
      data={data}
      keyExtractor={item => item.id.toString()}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <ArtWorkFavoritesCard
          item={item}
          source={
            item.image_id
              ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
              : 'https://via.placeholder.com/843x475.png?text=No+Image'
          }
          numColumns={numColumns}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      )}
    />
  );
};

export default ArtWorkFavoritesList;
