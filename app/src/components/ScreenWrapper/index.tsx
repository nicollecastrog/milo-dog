import React, { ReactNode } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

interface Props {
  children: ReactNode;
  scrollable?: boolean;
}

const ScreenWrapper = ({ children, scrollable = true }: Props) => (
  <View style={[styles.container]}>
    {Platform.OS === "web" || !scrollable ? (
      children
    ) : (
      <ScrollView style={styles.scrollView} alwaysBounceVertical={false}>
        {children}
      </ScrollView>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...(Platform.OS === "web" ? { flexGrow: 1 } : { flex: 1 })
  },
  scrollView: {
    flex: 1
  }
});

export default ScreenWrapper;
