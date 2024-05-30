import { useState, useEffect, useCallback } from 'react';
import { Data } from '../interfaces/response-data';

/**
 * Custom Hook para filtrar una lista de obras de arte según el tab activo y la consulta de búsqueda.
 * @param initialArtworks - La lista completa de obras de arte.
 * @param initialActiveTab - El tab activo (por ejemplo, "all", "photography", "painting", etc.).
 * @param initialSearchQuery - La consulta de búsqueda ingresada por el usuario.
 * @returns La lista filtrada de obras de arte según los criterios especificados.
 */
export const useFilterArtworks = (
  initialArtworks: Data[],
  initialActiveTab: string,
  initialSearchQuery: string,
) => {
  // Estado para almacenar las obras de arte filtradas
  const [filteredArtworks, setFilteredArtworks] = useState<Data[]>([]);

  // Función de filtrado
  const filterArtworks = useCallback((artworks: Data[], activeTab: string, searchQuery: string) => {
    let result = artworks;

    // Filtra por pestaña activa
    if (activeTab !== 'all') {
      result = result.filter((artwork: Data) =>
        artwork.classification_title
          ? artwork.classification_title.toLowerCase().includes(activeTab.toLowerCase())
          : false,
      );
    }

    // Filtra por nombre de artista
    if (searchQuery) {
      result = result.filter((artwork: Data) =>
        artwork.artist_title
          ? artwork.artist_title.toLowerCase().includes(searchQuery.toLowerCase())
          : false,
      );
    }

    // Ordena los artworks con imagen primero
    const artworksWithImage = result.filter(artwork => artwork.image_id);
    const artworksWithoutImage = result.filter(artwork => !artwork.image_id);
    return [...artworksWithImage, ...artworksWithoutImage];
  }, []);

  // Filtra las obras de arte cada vez que cambian los criterios de filtrado
  useEffect(() => {
    const filtered = filterArtworks(initialArtworks, initialActiveTab, initialSearchQuery);
    setFilteredArtworks(filtered);
  }, [initialArtworks, initialActiveTab, initialSearchQuery, filterArtworks]);

  return filteredArtworks; // Devuelve la lista filtrada de obras de arte
};
