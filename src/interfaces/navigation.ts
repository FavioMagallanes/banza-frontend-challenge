import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Artworks: undefined;
  ArtworkDetails: undefined;
};

export type ArtworkScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Artworks'
>;

export type ArtworkScreenRouteProp = RouteProp<RootStackParamList, 'Artworks'>;

export interface ArtworkScreenProps {
  navigation: ArtworkScreenNavigationProp;
  route: ArtworkScreenRouteProp;
}
