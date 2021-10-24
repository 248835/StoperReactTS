import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Props } from '../../App';

const Settings = ({ navigation }: Props<'Settings'>) => {
  const [headerColor, setHeaderColor] = React.useState('#f00');
  const [backgroundColor, setBackgroundColor] = React.useState('#0f0');
  const [textColor, setTextColor] = React.useState('#00f');

  return (
    <View style={styles.container}>

      <ScrollView>

      </ScrollView>

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
              headerColor: headerColor,
              backgroundColor: backgroundColor,
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
    marginBottom: 16
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
  }
})

export default Settings
