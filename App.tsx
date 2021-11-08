import React, { useState } from 'react';

import Stoper from './src/stoper/Stoper';
import { RouteProp, NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, useTheme } from 'react-native-paper';
import Settings from './src/settings/Settings';
import { Icon } from 'react-native-elements'

export type NativeStackParams = {
  Stoper: {
    headerColor: string,
    backgroundColor: string,
    textColor: string
  }
  Settings: undefined
};

type ScreenRouteProp<T extends keyof NativeStackParams> = RouteProp<NativeStackParams, T>;

type ScreenNavigationProp<
  T extends keyof NativeStackParams
  > = NativeStackNavigationProp<NativeStackParams, T>;

export type Props<T extends keyof NativeStackParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const Stack = createNativeStackNavigator();

const App = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Stoper"
          component={Stoper}
          initialParams={{ headerColor: "#8A2BE2", backgroundColor: "#FFFFFF", textColor: "#000000" }}
          options={({ navigation, route }) => ({
            headerStyle: {
              backgroundColor: !!route.params ? route.params.headerColor : colors.primary
            },
            headerRight: () => (
              <Icon name="settings"
                color={'white'}
                onPress={() => navigation.navigate("Settings", { headerColor: route.params.headerColor, textColor: route.params.textColor, backgroundColor: route.params.backgroundColor })} />
            ),
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Stoper' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
