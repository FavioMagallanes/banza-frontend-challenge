import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeEventEmitter } from 'react-native';

const eventEmitter = new NativeEventEmitter();

const useFavoriteArtworks = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const updateFavoritesFromStorage = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error retrieving favorites from AsyncStorage:', error);
      }
    };

    updateFavoritesFromStorage();

    const handleFavoritesUpdated = () => {
      updateFavoritesFromStorage();
    };

    const handleFavoritesCleared = () => {
      setFavorites([]);
    };

    const updateEventListener = eventEmitter.addListener(
      'FavoritesUpdated',
      handleFavoritesUpdated,
    );
    const clearEventListener = eventEmitter.addListener('FavoritesCleared', handleFavoritesCleared);

    return () => {
      updateEventListener.remove();
      clearEventListener.remove();
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

  return { favorites, addFavorite, removeFavorite, clearFavorites };
};

export default useFavoriteArtworks;
