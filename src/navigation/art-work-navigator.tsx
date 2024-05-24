/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { ArtworkScreen } from '../screens/art-work-screen/art-work-screen';
import { ArtworkDetailsScreen } from '../screens/art-work-details-screen/art-work-details-screen';
import { ArtWorksFavoritesScreen } from '../screens/art-work-favorites-screen/art-work-favorites-screen';
import { RootStackParamList } from '../interfaces/navigation';
import { theme } from '../../theme';
import { IconComponent } from '../components/icon/icon';

const Stack = createStackNavigator<RootStackParamList>();

// Componente para el icono en el header
const HeaderIcon = () => (
  <View style={{ marginLeft: 16 }}>
    <IconComponent name="color-palette-outline" size={30} color={theme.colors.primary} />
  </View>
);

export const ArtworkNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.placeholder,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerRightContainerStyle: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 16,
        },
      }}>
      <Stack.Screen
        name="Artworks"
        component={ArtworkScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerLeft: () => <HeaderIcon />,
        }}
      />
      <Stack.Screen
        name="ArtworkDetails"
        component={ArtworkDetailsScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={ArtWorksFavoritesScreen}
        options={{ title: 'Favorites' }}
      />
    </Stack.Navigator>
  );
};
