import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ArtworkNavigator from './art-work-navigator';
import ArtWorksFavoritesScreen from '../screens/art-work-favorites-screen/art-work-favorites-screen';
import { IconComponent } from '../components/icon/icon';
import { theme } from '../../theme';

const Drawer = createDrawerNavigator();

const HomeDrawerIcon = ({ color }: { color: string }) => (
  <IconComponent name="home-outline" size={24} color={color} />
);

const FavoritesDrawerIcon = ({ color }: { color: string }) => (
  <IconComponent name="heart-outline" size={24} color={color} />
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: theme.colors.text,
          drawerInactiveTintColor: theme.colors.placeholder,
          drawerStyle: {
            backgroundColor: theme.colors.surface,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={ArtworkNavigator}
          options={{
            title: 'Home',
            drawerIcon: HomeDrawerIcon,
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={ArtWorksFavoritesScreen}
          options={{
            drawerIcon: FavoritesDrawerIcon,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
