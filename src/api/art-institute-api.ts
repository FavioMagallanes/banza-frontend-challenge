import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1';

export const fetchArtworks = async (url = `${BASE_URL}/artworks?limit=12`) => {
  try {
    const response = await axios.get(url);
    return {
      data: response.data.data,
      nextUrl: response.data.pagination.next_url,
    };
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};
