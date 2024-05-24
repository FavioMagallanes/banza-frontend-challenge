import { useEffect, useState } from 'react';
import { useFilterArtworks } from './use-filter-art-works';
import { Data } from '../interfaces/response-data';
import { fetchArtworks } from '../api/art-institute-api';

/**
 * Custom Hook para cargar los datos iniciales de obras de arte desde la API y filtrarlos según el tab activo.
 * @param activeTab - El tab activo (por ejemplo, "all", "photography", "painting", etc.).
 * @returns Un objeto que contiene:
 *   - artworks: La lista completa de obras de arte cargadas desde la API.
 *   - filteredArtworks: La lista filtrada de obras de arte según el tab activo.
 *   - setFilteredArtworks: Una función para actualizar la lista filtrada de obras de arte.
 *   - loading: Un indicador booleano que indica si se están cargando los datos.
 */
export const useInitialDataLoader = (activeTab: string) => {
  const [artworks, setArtworks] = useState<Data[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { filterArtworks } = useFilterArtworks();

  // Carga los datos iniciales de obras de arte desde la API y filtra según el tab activo
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const data = await fetchArtworks();
        setArtworks(data);
        const filtered = filterArtworks(data, activeTab, ''); // Filtra los datos según el tab activo
        setFilteredArtworks(filtered);
      } catch (error) {
        console.error('Error fetching initial artworks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [activeTab, filterArtworks]);

  return { artworks, filteredArtworks, setFilteredArtworks, loading };
};
