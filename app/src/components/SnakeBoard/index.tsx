import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

type BoardRow = React.FC[];
type Board = BoardRow[];
interface RowProps {
  row: BoardRow;
}
interface Props {
  board: Board;
}

const paddingHorizontal = 10;

const Row = ({ row }: RowProps) => (
  <View style={styles.row}>{row.map((cell: React.FC) => cell)}</View>
);

const SnakeBoard = ({ board }: Props) => {
  const boardWidth = Dimensions.get("window").width - paddingHorizontal * 2;

  return (
    <View style={[styles.container, { width: boardWidth, height: boardWidth }]}>
      <View style={styles.board}>
        {board.map((row, i) => (
          <Row key={`row-${i}`} row={row} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center"
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
