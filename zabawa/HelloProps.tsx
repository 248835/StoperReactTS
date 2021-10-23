import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})

const Greetings: React.FC<{name:string}> = (props) => {
  return (
    <View style={styles.center}>
      <Text>Hello, {props.name}!</Text>
    </View>
  )
}

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greetings name="Rexxar"/>
      <Greetings name="Jaina"/>
      <Greetings name="Valeera"/>
    </View>
  )
}

export default LotsOfGreetings
