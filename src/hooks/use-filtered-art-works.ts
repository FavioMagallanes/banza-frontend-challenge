import { useState, useEffect } from 'react';
import { useFilterArtworks } from './use-filter-art-works';
import { Data } from '../interfaces/response-data';

/**
 * Custom Hook para filtrar una lista de obras de arte según el tab activo y la consulta de búsqueda.
 * @param artworks - La lista completa de obras de arte.
 * @param activeTab - El tab activo (por ejemplo, "all", "photography", "painting", etc.).
 * @param searchQuery - La consulta de búsqueda ingresada por el usuario.
 * @returns La lista filtrada de obras de arte según los criterios especificados.
 */
export const useFilteredArtworks = (artworks: Data[], activeTab: string, searchQuery: string) => {
  const { filterArtworks } = useFilterArtworks(); // Obtiene la función de filtrado desde otro hook
  const [filteredArtworks, setFilteredArtworks] = useState<Data[]>([]); // Estado para almacenar las obras de arte filtradas

  // Filtra las obras de arte cada vez que cambian los criterios de filtrado
  useEffect(() => {
    const filtered = filterArtworks(artworks, activeTab, searchQuery);
    setFilteredArtworks(filtered);
  }, [artworks, activeTab, searchQuery, filterArtworks]);

  return filteredArtworks; // Devuelve la lista filtrada de obras de arte
};
