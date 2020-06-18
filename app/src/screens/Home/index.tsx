import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FullWidthImage from "../../components/FullWidthImage";

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>milo.dog</Text>
    <View>
      <Text style={styles.description}>
        A massively over-engineered webapp about a small sausage dog
      </Text>
    </View>
    <View style={styles.imageWrapper}>
      <FullWidthImage imageName="dog" />
    </View>
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
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#161F26"
  },
  imageWrapper: {
    paddingVertical: 20
  }
});

export default HomeScreen;
