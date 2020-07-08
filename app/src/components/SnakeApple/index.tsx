import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Point } from "../../lib/snake";
import { appleRed } from "../../constants/colors";
import { calculateTopAndLeft } from "../../constants/snake";

interface Props {
  apple: Point;
  cellSize: number;
  width: number;
  height: number;
}

const SnakeApple = ({ apple, cellSize, width, height }: Props) => {
  const { x, y } = apple;
  const { top, left } = calculateTopAndLeft(apple, height);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ width: width, height: height }}>
          <View
            key={`x-${x}-y${y}`}
            style={[
              styles.appleCell,
              { top, left, width: cellSize, height: cellSize }
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  appleCell: {
    backgroundColor: appleRed,
    position: "absolute"
  }
});

export default SnakeApple;
