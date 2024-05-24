import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import { IconComponent } from '../icon/icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/navigation';
import { styles } from './art-work-card.styles';

type ArtWorkCardProps = {
  id: number;
  image?: string;
  title: string;
  description?: string;
  altText?: string;
  provenanceText?: string;
  artist_title?: string;
  classification_title?: string;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
};

export const ArtWorkCard = React.memo(
  ({
    image,
    title,
    description,
    altText,
    provenanceText,
    artist_title,
    classification_title,
    onFavoritePress,
    isFavorite,
    id,
  }: ArtWorkCardProps) => {
    const [loaded, setLoaded] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleCardPress = () => navigation.navigate('ArtworkDetails', { id });
    const handleImageLoad = () => setLoaded(true);

    return (
      <TouchableOpacity onPress={handleCardPress} activeOpacity={0.8}>
        <View style={styles.card}>
          {image && (
            <View style={styles.imageContainer}>
              {!loaded && (
                <ActivityIndicator
                  size="large"
                  color={theme.colors.primary}
                  style={styles.loadingIndicator}
                />
              )}
              <Image
                style={[styles.image, !loaded && styles.hidden]}
                source={{ uri: image }}
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
              <TouchableOpacity
                style={[styles.favoriteIcon, isFavorite && styles.favoriteIconFavorite]}
                onPress={onFavoritePress}>
                <IconComponent
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={32}
                  color={theme.colors.error}
                />
              </TouchableOpacity>
            </View>
          )}
          {loaded && (
            <>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.art_type}>
                {artist_title && <Text style={styles.artist_name}>{artist_title}</Text>}
                {classification_title && (
                  <Text style={styles.classification_text}>{classification_title}</Text>
                )}
              </View>
              {provenanceText && <Text style={styles.text}>{provenanceText}</Text>}
              {altText && <Text style={styles.text}>{altText}</Text>}
              {description && <Text style={styles.text}>{description}</Text>}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

ArtWorkCard.displayName = 'ArtWorkCard';
