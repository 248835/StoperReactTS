import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, IconButton, Colors, useTheme, Appbar} from 'react-native-paper';

const Stoper = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const { colors } = useTheme();

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval)
        clearInterval(interval);
    }
  }, [isActive, seconds]);

  return (
    <View style={styles.container}>

      <View style={styles.timerView}>
        <Text style={styles.timerText}>{new Date(seconds * 1000).toISOString().substr(14, 5)}</Text>
      </View>

      <View style={styles.buttonsView}>
        <IconButton icon='refresh'
          style={[styles.buttonLeft, {backgroundColor:colors.primary}]}
          color={'white'}
          onPress={() => null}/>
        <IconButton
          icon='play'
          style={[styles.buttonMiddle, {backgroundColor:colors.primary}]}
          color={'white'}
          onPress={() => null}/>
        <IconButton
          icon='timer'
          style={[styles.buttonRight, {backgroundColor:colors.primary}]}
          color={'white'}
          onPress={() => null}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  timerView: {
    flex: 1
  },
  timerText: {
    fontSize: 100,
    textAlign: 'center'
  },
  buttonsView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16
  },
  buttonLeft: {
    width: "15%",
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    margin:0
  },
  buttonMiddle: {
    width: "15%",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    margin:0
  },
  buttonRight: {
    width: "15%",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    margin:0
  }
})

export default Stoper
