/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import ArtWorksFavoritesScreen from '../screens/art-work-favorites-screen/art-work-favorites-screen';
import { IconComponent } from '../components/icon/icon';
import { theme } from '../../theme';
import { ArtworkNavigator } from './art-work-navigator';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

const HomeDrawerIcon = ({ color }: { color: string }) => (
  <IconComponent name="home-outline" size={24} color={color} />
);

const FavoritesDrawerIcon = ({ color }: { color: string }) => (
  <IconComponent name="heart-outline" size={24} color={color} />
);

export const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
          headerShown: false,
          drawerActiveTintColor: theme.colors.placeholder,
          drawerInactiveTintColor: theme.colors.text,
          drawerActiveBackgroundColor: theme.colors.primary,
          drawerStyle: {
            backgroundColor: '#ebe8e8',
            paddingVertical: 20,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={ArtworkNavigator}
          options={{ title: 'Home', drawerIcon: HomeDrawerIcon }}
        />
        <Drawer.Screen
          name="Favorites"
          component={ArtWorksFavoritesScreen}
          options={{ drawerIcon: FavoritesDrawerIcon }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
