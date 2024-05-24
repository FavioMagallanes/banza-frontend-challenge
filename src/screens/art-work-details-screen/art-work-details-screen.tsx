import React, { useContext, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/navigation';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { theme } from '../../../theme';
import { Data } from '../../interfaces/response-data';
import { ArtWorkDetail } from '../../components/art-work-details/art-work-detail';
import ArtworksContext from '../../context/art-work-context';

type ArtworkDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ArtworkDetails'>;

interface ArtworkDetailsScreenProps {
  route: ArtworkDetailsScreenRouteProp;
}

export const ArtworkDetailsScreen = ({ route }: ArtworkDetailsScreenProps) => {
  const { id } = route.params;
  const [artWork, setArtWork] = useState<Data | null>(null);
  const { loading, artworks } = useContext(ArtworksContext)!;

  useEffect(() => {
    if (!loading && artworks.length > 0) {
      const foundArtWork = artworks.find((artwork: Data) => artwork.id === id);
      setArtWork(foundArtWork || null);
    }
  }, [id, artworks, loading]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.loadingIndicator}
      />
    );
  }

  if (!artWork) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Artwork not found.</Text>
      </View>
    );
  }

  return (
    <View>
      <ArtWorkDetail artWork={artWork} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    color: theme.colors.text,
    fontSize: 16,
  },
});
