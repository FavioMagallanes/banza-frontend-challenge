import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  itemContainer: {
    margin: 8,
    padding: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    elevation: 2,
    height: 300,
  },
  singleColumn: {
    width: '90%',
  },
  multiColumn: {
    width: '45%',
  },
  imageContainer: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 8,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  artistTitle: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
  },
  classificationTitle: {
    fontSize: 12,
    color: theme.colors.gray,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  trashIconContainer: {
    padding: 4,
    borderRadius: 4,
  },
});
