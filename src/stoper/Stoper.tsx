import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { Props } from '../../App';

function msToHMS(milliseconds: number) {
	return new Date(milliseconds).toISOString().substr(11, 12);
}


const Stoper = ({ route }: Props<'Stoper'>) => {
	const [milliseconds, setMilliseconds] = useState(0);
	const [startTime, setStartTime] = useState((new Date()).valueOf())
	const [lastPause, setLastPause] = useState(0)
	const [isActive, setIsActive] = useState(false);
	const [timeMeasurements, setTimeMeasurements] = useState([] as number[]);


	const { colors } = useTheme();

	function MeasurementRow(timeDiff: number, totalTime: number, index: number) {
		return (
			<View key={index} style={styles.measurementRow}>
				<View>
					<Text style={[styles.measurementRowNumber, { color: route.params.textColor }]}>
						Pomiar {timeMeasurements.length - index}
					</Text>
					<Text style={[styles.measurementRowTimeDiff, { color: route.params.textColor }]}>
						Upłynęło: {msToHMS(timeDiff)}
					</Text>
				</View>
				<Text style={[styles.measurementRowTotalTime, { color: route.params.textColor }]}>
					{msToHMS(totalTime)}
				</Text>
			</View>
		);
	}

	function toggle() {
		if (isActive) {
			setIsActive(false);
			setLastPause((new Date().valueOf()) + lastPause - startTime)
		} else {
			setIsActive(true);
			setStartTime(new Date().valueOf())
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
				setMilliseconds((new Date().valueOf()) + lastPause - startTime);
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
		<View style={[styles.container, { backgroundColor: route.params.backgroundColor }]}>

			<View>
				<Text style={[styles.timerText, { color: route.params.textColor }]}>
					{msToHMS(milliseconds)}
				</Text>
			</View>

			<ScrollView style={styles.scrollView}>
				{timeMeasurements.map((value, index) => {
					let invInd = timeMeasurements.length - index - 1;
					let diff = timeMeasurements[invInd];
					if (index < timeMeasurements.length - 1) {
						diff = timeMeasurements[invInd] - timeMeasurements[invInd - 1];
					}
					return MeasurementRow(diff, timeMeasurements[invInd], index);
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
						timeMeasurements.push((new Date().valueOf()) + lastPause - startTime);
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
		fontSize: 60,
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
	},
	scrollView: {
		paddingHorizontal: 20
	},
	measurementRow: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		marginVertical: 6
	},
	measurementRowNumber: {
		fontSize: 20
	},
	measurementRowTimeDiff: {
		fontSize: 12
	},
	measurementRowTotalTime: {
		fontSize: 32,
		flex: 1,
		textAlign: 'right'
	}
})

export default Stoper
