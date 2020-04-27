import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import FlatButton from "./button";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";
import { countryCodes } from "./countryCodes";

export default function ChangeCity({ getNewCityData }) {
  return (
    <View>
      {/* <Header /> */}
      <Text style={styles.info}>
        {`Please enter the location below you would like to see the weather for.`}
      </Text>
      <Formik
        initialValues={{
          city: "",
          country: "",
        }}
        onSubmit={(values) => {
          getNewCityData(values.city, values.country);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.inputBoxes}
              placeholder='Location (requried)'
              onChangeText={props.handleChange("city")}
              value={props.values.city}
            />
            <Text> {props.errors.city}</Text>
            <Text style={styles.info}>
              It is not necessary to select a country, but is recommended if the
              location has a common name.
            </Text>
            <View style={styles.dropDown}>
              <RNPickerSelect
                style={styles.dropDown}
                selectedValue={props.values.country}
                onValueChange={(itemValue, itemIndex) => {
                  props.setFieldValue("country", itemValue);
                }}
                items={countryCodes}
              />
            </View>
            <FlatButton text='submit' onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    color: "#E0FBFC",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 10,
    width: 300,
    alignSelf: "center",
  },
  inputBoxes: {
    backgroundColor: "#E0FBFC",
    color: "grey",
    borderColor: "grey",
    borderRadius: 12,
    borderWidth: 10,
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropDown: {
    backgroundColor: "#E0FBFC",
    borderRadius: 12,
    fontWeight: "bold",
    height: 40,
    paddingBottom: 30,
  },
});
