import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

const FlexDirectionBasics = () => {
  const [flexDirection, setflexDirection] = useState("column");

  return (
    <PreviewLayout
      label="flexDirection"
      values={["column", "row", "row-reverse", "column-reverse"]}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
    >
      <View
        style={[styles.box, { backgroundColor: "powderblue" }]}
      />
      <View
        style={[styles.box, { backgroundColor: "skyblue" }]}
      />
      <View
        style={[styles.box, { backgroundColor: "steelblue" }]}
      />
    </PreviewLayout>
  );
};

const PreviewLayout: React.FC<{
  label: string,
  values: string[],
  selectedValue: string,
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>
}>
  =
  ({
    children,
    label,
    values,
    selectedValue,
    setSelectedValue,
  }) => (
      <View style={{ padding: 10, flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.row}>
          {values.map((value: string) => (
            <Button mode='contained' onPress={() => setSelectedValue(value)} style= {{width: "48%", margin: "1%"}} >
              {value}
            </Button>
          ))}
        </View>
        <View style={[styles.container, { [label]: selectedValue }]}>
          {children}
        </View>
      </View>
    );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

export default FlexDirectionBasics;
