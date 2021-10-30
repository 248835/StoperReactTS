import React, {useState, useRef} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Props } from '../../App';
import ColorPicker from 'react-native-wheel-color-picker'
import Dialog from "react-native-dialog";

const Settings = ({ navigation, route }: Props<'Settings'>) => {
	const picker = useRef();
	const [showPicker, setShowPicker] = useState(false);
	const [pickedColor, setPickedColor] = useState();

	const [bgColor, setBgColor] = useState(route.params.bgColor);
	const [textColor, setTextColor] = useState(route.params.textColor);
	const [barColor, setBarColor] = useState(route.params.barColor);
	const [target, setTarget] = useState('');

  const colorRectSize = 100;

	const PickColorView = (props) => {
		return (
			<View style={{alignItems: 'center', marginBottom: 30}}>
				<TouchableOpacity  
					style={{backgroundColor: props.color, width: colorRectSize, height: colorRectSize, marginBottom: 10, borderWidth: 1}} 
					onPress={() => {
					  setTarget(props.target);
					  setShowPicker(true);
					}}/>
				<Button
				  mode='contained'
				  style={[styles.buttonPick,]}
				  onPress={() => {
					  setTarget(props.target);
					  setShowPicker(true);
				  }}>
				  {props.label}
				</Button>
			</View>
		);
	}

	function onColorChangeComplete(newColor) {
			switch(target){
				case 'bgColor':
					setBgColor(newColor);
					break;
				case 'textColor':
					setTextColor(newColor);
					break;
				case 'barColor':
					setBarColor(newColor);
					break;
		  }
	}
	
	function currentColor() {
		switch(target){
				case 'bgColor':
					return bgColor;
				case 'textColor':
					return textColor;
				case 'barColor':
					return barColor;
		}
		return null;
	}

  return (
    <View style={styles.container}>
		<View>
			<Dialog.Container visible={showPicker}>
			  <Dialog.Title>Kolor tła</Dialog.Title>
			  <ColorPicker 
				ref={picker}
				color={currentColor()}
				onColorChange={(newColor) => setPickedColor(newColor)}
			  />
			  <Dialog.Button label="Anuluj" onPress={() => setShowPicker(false)}/>
			  <Dialog.Button label="Zatwierdź" onPress={() => {
				  onColorChangeComplete(pickedColor);
					setShowPicker(false);
			  }} 
				/>
			</Dialog.Container>
		  </View>

		<Text style={{fontSize: 45, marginLeft: 10}}>Ustawienia</Text>
      <View style={{alignItems: 'center', marginTop: 20}}>
	  	<PickColorView color={textColor} label='Kolor tekstu' target='textColor'/>
		<PickColorView color={barColor} label='Kolor paska' target='barColor'/>
		<PickColorView color={bgColor} label='Kolor tła' target='bgColor'/>
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
              barColor: barColor,
              bgColor: bgColor,
              textColor: textColor
            },
            merge: true
          })}>Zatwierdź</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  buttonPick: {
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
  }
})

export default Settings
