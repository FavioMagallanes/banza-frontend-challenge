import { useEffect, useState } from 'react';

import useFilterArtworks from './use-filter-art-works';
import { Data } from '../interfaces/response-data';
import { fetchArtworks } from '../api/art-institute-api';

const useInitialDataLoader = (activeTab: string) => {
  const [artworks, setArtworks] = useState<Data[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { filterArtworks } = useFilterArtworks();

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const data = await fetchArtworks();
        setArtworks(data);
        const filtered = filterArtworks(data, activeTab);
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

export default useInitialDataLoader;
