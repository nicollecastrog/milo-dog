import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>milo.dog</Text>
              <View>
                <Text style={styles.sectionDescription}>
                  A massively over-engineered webapp about a small sausage dog
                </Text>
              </View>
              <View style={styles.sectionImageWrapper}>
                <Image
                  style={styles.sectionImage}
                  source={require("./images/dog/dog.png")}
                />
              </View>
            </View>
          </View>
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
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#161F26"
  },
  sectionImageWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20
  },
  sectionImage: {
    resizeMode: "contain",
    flex: 1,
    aspectRatio: 1.82
  }
});

export default App;
