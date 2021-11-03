import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Props } from '../../App';
import ColorPicker from 'react-native-wheel-color-picker'
import Dialog from "react-native-dialog";

const Settings = ({ navigation, route }: Props<'Stoper'>) => {
	const picker = useRef();
	const [showPicker, setShowPicker] = useState(false);
	const [pickedColor, setPickedColor] = useState('');

	const [bgColor, setBgColor] = useState(route.params.backgroundColor);
	const [textColor, setTextColor] = useState(route.params.textColor);
	const [barColor, setBarColor] = useState(route.params.headerColor);

	type OnColorChangedCallback = (newColor: string) => void;
	const [onColorChanged, setTestFunc] = useState<OnColorChangedCallback>((newColor: string) => { });

	type PickColorViewProps = {
		color: string,
		label: string,
		onColorChange: OnColorChangedCallback
	};

	function onPickerPress(props: PickColorViewProps) {
		setTestFunc(() => props.onColorChange);
		setPickedColor(props.color);
		setShowPicker(true);
	}

	const PickColorView = (props: PickColorViewProps) => {
		return (
			<View style={styles.pickColorView}>
				<TouchableOpacity
					style={[styles.colorRect, { backgroundColor: props.color }]}
					onPress={() => onPickerPress(props)} />
				<Button
					mode='contained'
					style={styles.pickColorBtn}
					onPress={() => onPickerPress(props)}>
					{props.label}
				</Button>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View>
				<Dialog.Container visible={showPicker}>
					<Dialog.Title>Kolor tła</Dialog.Title>
					<ColorPicker
						ref={picker}
						color={pickedColor}
						onColorChange={(newColor) => setPickedColor(newColor)}
					/>
					<Dialog.Button label="Anuluj" onPress={() => setShowPicker(false)} />
					<Dialog.Button label="Zatwierdź" onPress={() => {
						onColorChanged(pickedColor);
						setShowPicker(false);
					}}
					/>
				</Dialog.Container>
			</View>

			<Text style={styles.titleText}>Ustawienia</Text>
			<View style={styles.colorPickersContainer}>
				<PickColorView color={textColor} label='Kolor tekstu' onColorChange={(newColor) => { setTextColor(newColor) }} />
				<PickColorView color={barColor} label='Kolor paska' onColorChange={(newColor) => { setBarColor(newColor) }} />
				<PickColorView color={bgColor} label='Kolor tła' onColorChange={(newColor) => { setBgColor(newColor) }} />
			</View>

			<View style={styles.buttonsView}>
				<Button
					mode='contained'
					style={[styles.buttonLeft,]}
					onPress={navigation.goBack}>Anuluj</Button>
				{/*https://reactnavigation.org/docs/params/#passing-params-to-a-previous-screen*/}
				<Button
					mode='contained'
					style={[styles.buttonRight,]}
					onPress={() => navigation.navigate({
						name: 'Stoper',
						params: {
							headerColor: barColor,
							backgroundColor: bgColor,
							textColor: textColor
						},
						merge: true
					})}>Zatwierdź</Button>
			</View>
		</View>
	)
}

const colorRectSize = 100;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	titleText: {
		fontSize: 45,
		marginLeft: 10
	},
	buttonsView: {
		justifyContent: 'center',
		flexDirection: 'row',
		marginBottom: 16,
		alignSelf: 'center',
		position: 'absolute',
		bottom: 10
	},
	buttonLeft: {
		borderBottomLeftRadius: 30,
		borderTopLeftRadius: 30,
		borderBottomRightRadius: 0,
		borderTopRightRadius: 0,
		margin: 0
	},
	buttonRight: {
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
		borderBottomRightRadius: 30,
		borderTopRightRadius: 30,
		margin: 0
	},
	pickColorBtn: {
		borderBottomLeftRadius: 30,
		borderTopLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopRightRadius: 30,
	},
	colorRect: {
		width: colorRectSize,
		height: colorRectSize,
		marginBottom: 10,
		borderWidth: 1
	},
	pickColorView: {
		alignItems: 'center',
		marginBottom: 30
	},
	colorPickersContainer: {
		alignItems: 'center',
		marginTop: 20
	}
})

export default Settings
