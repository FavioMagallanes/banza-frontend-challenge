import { useState, useEffect, useCallback } from 'react';
import { NativeEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const addFavorite = async (id: string) => {
    const updatedFavorites = [...favorites, id];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    eventEmitter.emit('FavoritesUpdated');
  };

  const removeFavorite = async (id: string) => {
    const updatedFavorites = favorites.filter(favId => favId !== id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    eventEmitter.emit('FavoritesUpdated');
  };

  const clearFavorites = async () => {
    setFavorites([]);
    await AsyncStorage.removeItem('favorites');
    eventEmitter.emit('FavoritesCleared');
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
};
