import { Data } from '../interfaces/response-data';
import { useCallback } from 'react';

const useFilterArtworks = () => {
  const filterArtworks = useCallback((artworks: Data[], activeTab: string) => {
    // Filtrar artworks según la pestaña activa
    let filteredArtworks = artworks;
    if (activeTab !== 'all') {
      filteredArtworks = artworks.filter((artwork: Data) =>
        artwork.classification_title
          ? artwork.classification_title.toLowerCase().includes(activeTab.toLowerCase())
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
