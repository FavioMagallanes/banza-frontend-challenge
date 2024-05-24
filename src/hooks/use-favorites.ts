import { useState, useEffect, useCallback } from 'react';
import { NativeEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// Crea un objeto NativeEventEmitter para emitir y escuchar eventos
const eventEmitter = new NativeEventEmitter();

/**
 * Custom Hook para manejar los favoritos de obras de arte.
 * Utiliza AsyncStorage para almacenar y recuperar los favoritos,
 * y emite eventos para notificar a otros componentes sobre los cambios en los favoritos.
 * También muestra notificaciones al usuario cuando se agregan o eliminan obras de arte de los favoritos.
 * @returns Un objeto con los siguientes elementos:
 *   - favorites: Un array con los IDs de las obras de arte favoritas.
 *   - addFavorite: Una función para agregar un ID a los favoritos.
 *   - removeFavorite: Una función para eliminar un ID de los favoritos.
 *   - clearFavorites: Una función para eliminar todos los favoritos.
 *   - handleAddArtWorkToFavorites: Una función para agregar o eliminar una obra de arte de los favoritos y mostrar una notificación al usuario.
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Función para cargar los favoritos desde AsyncStorage
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

  // Carga los favoritos cuando se monta el componente
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Actualiza los favoritos cuando se emite el evento 'FavoritesUpdated'
  useEffect(() => {
    const handleFavoritesUpdated = async () => {
      await loadFavorites();
    };
    const eventListener = eventEmitter.addListener('FavoritesUpdated', handleFavoritesUpdated);
    return () => {
      eventListener.remove();
    };
  }, [loadFavorites]);

  // Maneja el evento 'FavoritesCleared' y establecer favoritos vacíos
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

  // Función para agregar o eliminar una obra de arte de los favoritos y mostrar una notificación al usuario
  const handleAddArtWorkToFavorites = useCallback(
    async (id: string) => {
      if (favorites.includes(id)) {
        // Si la obra de arte ya está en favoritos, la elimina
        await removeFavorite(id);
        Toast.show({
          type: 'info',
          text1: 'Removed from favorites!',
        });
      } else {
        // Si la obra de arte no está en favoritos, la agrega
        await addFavorite(id);
        Toast.show({
          type: 'success',
          text1: 'Added to favorites!',
        });
      }
    },
    [favorites, addFavorite, removeFavorite],
  );

  return { favorites, addFavorite, removeFavorite, clearFavorites, handleAddArtWorkToFavorites };
};
