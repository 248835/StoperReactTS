import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { Props } from '../../App';

function msToHMS( ms ) {
  var seconds = ms / 1000;

  seconds = parseInt(seconds % 60); // seconds remaining after extracting hours

  var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute

  seconds = parseInt(seconds % 60);
  ms = parseInt(ms % 1000);

  let minutesStr = ("00" + minutes).slice(-2);
  let secondsStr = ("00" + seconds).slice(-2);
  let millisecondsStr = ( "000" + ms).slice(-3);

  return minutesStr + ":" + secondsStr + ":" + millisecondsStr;
}



const Stoper = ({ route }: Props<'Stoper'>) => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [startTime, setStartTime] = useState((new Date()).valueOf())
  const [lastPause, setLastPause] = useState(0)
  const [isActive, setIsActive] = useState(false);
  const [timeMeasurements, setTimeMeasurements] = useState([]);


  const { colors } = useTheme();

	function MeasurementTile(timeDiff, totalTime, index) {
		return (
			<View key={index} style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginVertical: 2}}>
				<View>
					<Text style={{ color: route.params?.textColor, fontSize: 25}}>Pomiar {timeMeasurements.length - index}</Text>
					<Text style={{ color: route.params?.textColor, fontSize: 12}}>Upłynęło: {msToHMS(timeDiff)}</Text>
				</View>
				<Text style={{ color: route.params?.textColor, flex: 1, textAlign: 'right', fontSize: 40}}>{msToHMS(totalTime)}</Text>
			</View>
		);
	}

  function toggle() {
    if (isActive) {
      setIsActive(false);
      setLastPause((new Date().valueOf())+lastPause-startTime)
    } else {
      setIsActive(true);
      setStartTime(new Date())
    }
  }

  function reset() {
    setMilliseconds(0);
    setLastPause(0)
    setIsActive(false);
	setTimeMeasurements([]);
  }

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds((new Date().valueOf())+lastPause-startTime);
      }, 17);
    } else if (!isActive && milliseconds !== 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval)
        clearInterval(interval);
    }
  }, [isActive, milliseconds]);

  return (
    <View style={[styles.container, { backgroundColor: route.params?.bgColor }]}>

      <View>
        <Text style={[styles.timerText,
        { color: route.params?.textColor }]}>
          {new Date(milliseconds).toISOString().substr(14, 9)}
        </Text>
      </View>

      <ScrollView style={{paddingHorizontal: 20}}>
        {timeMeasurements.map((value, index) => {
			let invInd = timeMeasurements.length - index - 1;
			let diff = timeMeasurements[invInd];
			if(index < timeMeasurements.length - 1) {
				diff = timeMeasurements[invInd] - timeMeasurements[invInd - 1];
			}
			return MeasurementTile(diff, timeMeasurements[invInd], index, route);
		})}
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
          onPress={() => {
			timeMeasurements.push((new Date()).valueOf() - startTime);
		  }}
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
    fontSize: 80,
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
