import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArtworkScreen from '../screens/art-work-screen/art-work-screen';
import ArtworkDetailsScreen from '../screens/art-work-details-screen/art-work-details-screen';
import { RootStackParamList } from '../interfaces/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const ArtworkNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Artworks" component={ArtworkScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArtworkDetails" component={ArtworkDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ArtworkNavigator;
