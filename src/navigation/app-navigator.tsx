import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ArtworkNavigator from './art-work-navigator';
import ArtWorksFavoritesScreen from '../screens/art-work-favorites-screen/art-work-favorites-screen';
import { IconComponent } from '../components/icon/icon';
import { theme } from '../../theme';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const renderArtworksIcon = ({ color }: { color: string }) => (
    <IconComponent name="home-outline" size={24} color={color} />
  );

  const renderFavoritesIcon = ({ color }: { color: string }) => (
    <IconComponent name="heart-outline" size={24} color={color} />
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.placeholder,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}>
        <Tab.Screen
          name="Artworks"
          component={ArtworkNavigator}
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: renderArtworksIcon,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={ArtWorksFavoritesScreen}
          options={{
            headerShown: false,
            tabBarIcon: renderFavoritesIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
