import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Data } from './interfaces/response-data';
import { fetchArtworks } from './api/art-institute-api';

interface ArtworksContextType {
  artworks: Data[];
  setArtworks: React.Dispatch<React.SetStateAction<Data[]>>;
  loading: boolean;
  error: string | null;
}

interface ArtworksProviderProps {
  children: ReactNode;
}

const ArtworksContext = createContext<ArtworksContextType | undefined>(undefined);

export const ArtworksProvider: React.FC<ArtworksProviderProps> = ({ children }) => {
  const [artworks, setArtworks] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworksData = async () => {
      try {
        const data = await fetchArtworks();
        setArtworks(data);
        setLoading(false);
      } catch (fetchError) {
        setError('Error fetching artworks');
        setLoading(false);
      }
    };

    fetchArtworksData();
  }, []);

  return (
    <ArtworksContext.Provider value={{ artworks, setArtworks, loading, error }}>
      {children}
    </ArtworksContext.Provider>
  );
};

export default ArtworksContext;
