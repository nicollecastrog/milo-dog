import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SnakeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Milo Snake Game</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black"
  }
});

export default SnakeScreen;
