import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1';

export const fetchArtworks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/artworks?limit=50`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};
