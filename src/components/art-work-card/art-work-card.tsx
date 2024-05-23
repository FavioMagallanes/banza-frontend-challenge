import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import { IconComponent } from '../icon/icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/navigation';

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

const ArtWorkCard = ({
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

  const handleCardPress = () => {
    navigation.navigate('ArtworkDetails', { id });
  };

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
};

export default ArtWorkCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 375,
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 8,
  },
  artist_name: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 8,
  },
  art_type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classification_text: {
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: 'bold',
    marginTop: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
  },
  hidden: {
    display: 'none',
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    elevation: 5,
  },
  favoriteIconNormal: {
    transform: [{ scale: 1 }],
  },
  favoriteIconFavorite: {
    transform: [{ scale: 1.2 }],
  },
});
