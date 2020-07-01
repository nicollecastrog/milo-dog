import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Point } from "../../lib/snake";
import { snakeGreen } from "../../constants/colors";
import { calculateTopAndLeft } from "../../constants/snake";

interface Props {
  snake: Point[];
  cellSize: number;
  width: number;
  height: number;
}

const Snake = ({ snake, cellSize, width, height }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ width: width, height: height }}>
          {snake.map((cell) => {
            const { x, y } = cell;
            const { top, left } = calculateTopAndLeft(cell);
            return (
              <View
                key={`x-${x}-y${y}`}
                style={[
                  styles.snakeCell,
                  { top, left, width: cellSize, height: cellSize }
                ]}
              />
            );
          })}
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
  snakeCell: {
    backgroundColor: snakeGreen,
    position: "absolute"
  }
});

export default Snake;
