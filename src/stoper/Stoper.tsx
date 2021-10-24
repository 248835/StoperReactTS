import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { Props } from '../../App';

interface TimeMeasurment {
  number: number,
  measuredTime: string,
  elapsedTime: string
}

const Stoper = ({ route }: Props<'Stoper'>) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeMeasurments, setTimeMeasurments] = useState<TimeMeasurment[]>([{
    number: 1,
    measuredTime: '1:1:1',
    elapsedTime: '1:1:1'
  },
  {
    number: 2,
    measuredTime: '2:2:2',
    elapsedTime: '2:2:2'
  }])

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
    <View style={[styles.container, {backgroundColor: route.params?.backgroundColor}]}>

      <View>
        <Text style={[styles.timerText,
          { color: route.params?.textColor }]}>
          {new Date(seconds * 1000).toISOString().substr(14, 5)}
          </Text>
      </View>

      <ScrollView>
        {timeMeasurments.map(value =>
          <Text key={value.number} style={{color: route.params?.textColor}}>numer: {value.number} czas1: {value.elapsedTime} czas2: {value.measuredTime}</Text>
        )}
      </ScrollView>

      <View style={styles.buttonsView}>
        <IconButton icon='refresh'
          style={[styles.buttonLeft, { backgroundColor: colors.primary }]}
          color={'white'}
          onPress={reset}
          disabled={isActive} />
        <IconButton
          icon={isActive ? 'pause' : 'play'}
          style={[styles.buttonMiddle, { backgroundColor: colors.primary }]}
          color={'white'}
          onPress={toggle} />
        <IconButton
          icon='timer'
          style={[styles.buttonRight, { backgroundColor: colors.primary }]}
          color={'white'}
          onPress={() => null}
          disabled={!isActive} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
    margin: 0
  },
  buttonMiddle: {
    width: "15%",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    margin: 0
  },
  buttonRight: {
    width: "15%",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    margin: 0
  }
})

export default Stoper
