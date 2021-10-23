import React from 'react';

import { Button, Text } from "react-native";
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

// https://medium.com/edonec/getting-started-with-react-navigation-in-react-native-typescript-f4343bc7e373

export type NativeStackParams = {
  HomeScreen: undefined
  Profile: {name: string}
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

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }: Props<'HomeScreen'>) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate({name: "Profile", params: {name: 'Jane'}})
      }
    />
  );
};

const ProfileScreen = ({navigation, route }: Props<'Profile'>) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default MyStack
