import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>WeatherNow!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    alignItems: "center",
  },
  headerText: {
    color: "#E0FBFC",
    fontWeight: "bold",
    alignItems: "center",
    paddingTop: 10,
    fontSize: 20,
    paddingBottom: 10,
  },
});
