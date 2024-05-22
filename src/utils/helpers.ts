import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeEventEmitter } from 'react-native';

const eventEmitter = new NativeEventEmitter();

export const handleAddArtWorkToFavorites = async (
  id: string,
  favorites: string[],
  addFavorite: (id: string) => Promise<void>,
  removeFavorite: (id: string) => Promise<void>,
): Promise<void> => {
  if (favorites.includes(id)) {
    await removeFavorite(id);
    Toast.show({
      type: 'info',
      text1: 'Removed from favorites!',
    });
  } else {
    await addFavorite(id);
    Toast.show({
      type: 'success',
      text1: 'Added to favorites!',
    });
  }

  try {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    eventEmitter.emit('FavoritesUpdated');
  } catch (err) {
    console.error('Error updating favorites in AsyncStorage:', err);
  }
};
