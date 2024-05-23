import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 375,
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 8,
  },
  artist_name: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 8,
  },
  art_type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classification_text: {
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: 'bold',
    marginTop: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
  },
  hidden: {
    display: 'none',
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    elevation: 5,
  },
  favoriteIconNormal: {
    transform: [{ scale: 1 }],
  },
  favoriteIconFavorite: {
    transform: [{ scale: 1.2 }],
  },
});
