import { useState, useEffect } from 'react';
import { Data } from '../interfaces/response-data';
import useFilterArtworks from './use-filter-art-works';

export const useFilteredArtworks = (artworks: Data[], activeTab: string, searchQuery: string) => {
  const { filterArtworks } = useFilterArtworks();
  const [filteredArtworks, setFilteredArtworks] = useState<Data[]>([]);

  useEffect(() => {
    const filtered = filterArtworks(artworks, activeTab, searchQuery);
    setFilteredArtworks(filtered);
  }, [artworks, activeTab, searchQuery, filterArtworks]);

  return filteredArtworks;
};
