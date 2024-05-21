import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme';

type ArtWorkCardProps = {
  image?: string;
  title: string;
  description?: string;
  altText?: string;
  provenanceText?: string;
};

const ArtWorkCard = ({ image, title, description, altText, provenanceText }: ArtWorkCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {altText && <Text style={styles.text}>{altText}</Text>}
      {image && <Image style={styles.image} source={{ uri: image }} />}
      {provenanceText && <Text style={styles.text}>{provenanceText}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
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
  image: {
    width: '100%',
    height: 375,
    borderRadius: 14,
    marginTop: 14,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  text: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: 8,
  },
});
