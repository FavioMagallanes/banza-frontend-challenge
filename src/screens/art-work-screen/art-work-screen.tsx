import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Pressable,
  Text,
} from 'react-native';
import { Hero } from '../../components/ui/hero';
import SearchInput from '../../components/search-input/search-input';
import SearchTab from '../../components/search-tab/search-tab';
import ArtWorkCard from '../../components/art-work-card/art-work-card';
import { fetchArtworks } from '../../api/art-institute-api';
import { Data } from '../../interfaces/response-data';
import { theme } from '../../../theme';

const ArtworkScreen = () => {
  const [artworks, setArtworks] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setArtworks([]);
    setNextUrl(null);
    setHasMoreData(true);
    loadInitialData();
  };

  const loadMoreArtworks = async () => {
    if (loading || !hasMoreData) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetchArtworks(nextUrl ?? undefined);
      const { data, nextUrl: newNextUrl } = response;

      if (data.length > 0) {
        setArtworks(prevArtworks => [...prevArtworks, ...data]);
        setNextUrl(newNextUrl);
        setHasMoreData(!!newNextUrl);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const response = await fetchArtworks();
      const { data, nextUrl: newNextUrl } = response;
      setArtworks(data);
      setNextUrl(newNextUrl);
      setHasMoreData(!!newNextUrl);
    } catch (error) {
      console.error('Error fetching initial artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Hero />
      <SearchInput />
      <SearchTab
        tabs={[
          { key: 'all', label: 'All' },
          { key: 'painting', label: 'Painting' },
          { key: 'sculpture', label: 'Sculpture' },
          { key: 'photography', label: 'Photography' },
        ]}
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
      {loading && !artworks.length ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={artworks}
          renderItem={({ item, index }) => (
            <ArtWorkCard
              key={`${item.id}-${index}`}
              title={item.title}
              image={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
              provenanceText={item.provenance_text ?? ''}
              description={item.short_description}
              altText={item.thumbnail.alt_text}
            />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={{ paddingHorizontal: 18 }}
          ListFooterComponent={
            hasMoreData ? (
              <Pressable onPress={loadMoreArtworks} disabled={loading}>
                <Text style={{ color: theme.colors.primary, textAlign: 'center', padding: 16 }}>
                  {loading ? 'Loading...' : 'Load more'}
                </Text>
              </Pressable>
            ) : null
          }
          style={styles.flatList}
        />
      )}
      {loading && artworks.length > 0 && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatList: {
    flex: 1,
  },
});

export default ArtworkScreen;
