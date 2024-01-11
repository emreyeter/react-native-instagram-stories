import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
    height: 2,
    flexDirection: 'row',
    gap: 4,
  },
  item: {
    height: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemActive: {
    backgroundColor: '#1A96F0',
  },
  itemInactive: {
    backgroundColor: '#ffffff',
  },
} );
