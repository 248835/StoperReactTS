import React from 'react';

import Stoper from './src/stoper/Stoper';
import { RouteProp, NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, useTheme } from 'react-native-paper';
import Settings from './src/settings/Settings';

export type NativeStackParams = {
  Stoper: undefined
  Settings: undefined
};

type ScreenRouteProp<T extends keyof NativeStackParams> = RouteProp<NativeStackParams,T>;

type ScreenNavigationProp<
  T extends keyof NativeStackParams
> = NativeStackNavigationProp<NativeStackParams, T>;

type Props<T extends keyof NativeStackParams> = {
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
          headerStyle:{
            backgroundColor:colors.primary
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Stoper"
          component={Stoper}
          options={({ navigation, route }) => ({
          headerRight: () => (
            <IconButton icon='play'
              color={'white'}
              onPress={() => navigation.navigate({name: "Settings"})}/>
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
