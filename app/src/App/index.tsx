import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";

import Home from "../screens/Home";

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Home />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default App;
