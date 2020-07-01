import React from "react";
import { StyleSheet, View } from "react-native";
import { boardLightBlue, boardDarkBlue } from "../../../constants/colors";

interface Props {
  x: number;
  y: number;
}

const SnakeBoardCell = ({ x, y }: Props) => {
  const i = x + y;
  return (
    <View
      key={`x-${x}-y${y}`}
      style={[styles.cell, i % 2 === 0 ? styles.even : styles.odd]}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    flexGrow: 1
  },
  even: {
    backgroundColor: boardLightBlue
  },
  odd: {
    backgroundColor: boardDarkBlue
  }
});

export default SnakeBoardCell;
