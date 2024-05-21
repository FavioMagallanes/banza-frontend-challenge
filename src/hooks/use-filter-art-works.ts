import { Data } from '../interfaces/response-data';
import { useCallback } from 'react';

const useFilterArtworks = () => {
  const filterArtworks = useCallback((artworks: Data[], activeTab: string, searchQuery: string) => {
    // Filtrar artworks según la pestaña activa y la búsqueda por nombre de artista
    let filteredArtworks = artworks;

    // Filtrar por pestaña activa
    if (activeTab !== 'all') {
      filteredArtworks = artworks.filter((artwork: Data) =>
        artwork.classification_title
          ? artwork.classification_title.toLowerCase().includes(activeTab.toLowerCase())
          : false,
      );
    }

    // Filtrar por nombre de artista
    if (searchQuery) {
      filteredArtworks = filteredArtworks.filter((artwork: Data) =>
        artwork.artist_title
          ? artwork.artist_title.toLowerCase().includes(searchQuery.toLowerCase())
          : false,
      );
    }

    // Ordenar los artworks con imagen primero
    const artworksWithImage = filteredArtworks.filter(artwork => artwork.image_id);
    const artworksWithoutImage = filteredArtworks.filter(artwork => !artwork.image_id);
    return [...artworksWithImage, ...artworksWithoutImage];
  }, []);

  return { filterArtworks };
};

export default useFilterArtworks;
