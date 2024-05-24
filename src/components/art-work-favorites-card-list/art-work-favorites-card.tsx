import React, { FC } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { truncateTitle } from '../../helpers/helpers';
import { IconComponent } from '../icon/icon';
import { Data } from '../../interfaces/response-data';
import { theme } from '../../../theme';
import { styles } from './art-work-favorites-card-list.styles';

interface ArtWorkFavoritesCardProps {
  item: Data;
  numColumns: number;
  source: string;
  handleRemoveFavorite: (id: number) => void;
}

export const ArtWorkFavoritesCard: FC<ArtWorkFavoritesCardProps> = ({
  item,
  source,
  numColumns,
  handleRemoveFavorite,
}) => {
  return (
    <View
      style={[styles.itemContainer, numColumns === 1 ? styles.singleColumn : styles.multiColumn]}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: source,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{truncateTitle(item.title, 30)}</Text>
        <Text style={styles.artistTitle}>{item.artist_title}</Text>
      </View>
      <View style={styles.bottomContainer}>
        {item.classification_title && (
          <Text style={styles.classificationTitle}>{item.classification_title}</Text>
        )}
        <TouchableOpacity
          style={styles.trashIconContainer}
          onPress={() => handleRemoveFavorite(item.id)}>
          <IconComponent name="trash-outline" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
