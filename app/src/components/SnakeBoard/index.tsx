import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

type BoardRow = React.FC[];
type Board = BoardRow[];
interface RowProps {
  row: BoardRow;
}
interface Props {
  board: Board;
  width: number;
  height: number;
}

const Row = ({ row }: RowProps) => (
  <View style={styles.row}>{row.map((cell: React.FC) => cell)}</View>
);

const SnakeBoard = ({ board, width, height }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: width, height: height }}>
        <View style={styles.board}>
          {board.map((row, i) => (
            <Row key={`row-${i}`} row={row} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  board: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  row: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default SnakeBoard;
