import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeEventEmitter } from 'react-native';
import Toast from 'react-native-toast-message';

const eventEmitter = new NativeEventEmitter();

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      console.error('Error loading favorites from AsyncStorage:', err);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    const handleFavoritesUpdated = async () => {
      await loadFavorites();
    };

    const eventListener = eventEmitter.addListener('FavoritesUpdated', handleFavoritesUpdated);

    return () => {
      eventListener.remove();
    };
  }, [loadFavorites]);

  useEffect(() => {
    const handleFavoritesCleared = () => {
      setFavorites([]);
    };

    const eventListener = eventEmitter.addListener('FavoritesCleared', handleFavoritesCleared);

    return () => {
      eventListener.remove();
    };
  }, []);

  const addFavorite = useCallback(
    async (id: string) => {
      try {
        const updatedFavorites = [...favorites, id];
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        eventEmitter.emit('FavoritesUpdated');
      } catch (error) {
        console.error('Error adding favorite to AsyncStorage:', error);
      }
    },
    [favorites],
  );

  const removeFavorite = useCallback(
    async (id: string) => {
      try {
        const updatedFavorites = favorites.filter(artwork => artwork !== id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        eventEmitter.emit('FavoritesUpdated');
      } catch (error) {
        console.error('Error removing favorite from AsyncStorage:', error);
      }
    },
    [favorites],
  );

  const clearFavorites = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('favorites');
      setFavorites([]);
      eventEmitter.emit('FavoritesCleared');
    } catch (error) {
      console.error('Error clearing favorites from AsyncStorage:', error);
    }
  }, []);

  const handleAddArtWorkToFavorites = useCallback(
    async (id: string) => {
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
    },
    [favorites, addFavorite, removeFavorite],
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
    handleAddArtWorkToFavorites,
  };
};
