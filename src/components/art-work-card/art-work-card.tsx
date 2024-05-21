import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { theme } from '../../../theme';

type ArtWorkCardProps = {
  image?: string;
  title: string;
  description?: string;
  altText?: string;
  provenanceText?: string;
  artist_title?: string;
  classification_title?: string;
};

const ArtWorkCard = ({
  image,
  title,
  description,
  altText,
  provenanceText,
  artist_title,
  classification_title,
}: ArtWorkCardProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => setLoaded(true);

  return (
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
        </View>
      )}
      {loaded && (
        <>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.art_type}>
            {artist_title && <Text style={styles.artist_name}>{artist_title}</Text>}
            {classification_title && <Text style={styles.text}>{classification_title}</Text>}
          </View>
          {provenanceText && <Text style={styles.text}>{provenanceText}</Text>}
          {altText && <Text style={styles.text}>{altText}</Text>}
          {description && <Text style={styles.text}>{description}</Text>}
        </>
      )}
    </View>
  );
};

export default ArtWorkCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
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
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
  },
  hidden: {
    display: 'none',
  },
});
