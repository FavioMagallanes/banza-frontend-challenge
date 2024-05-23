import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Artworks: undefined;
  ArtworkDetails: { id: number };
  Favorites: undefined;
};

export type ArtworkDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ArtworkDetails'>;
