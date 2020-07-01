import React from "react";
import { StyleSheet, View } from "react-native";
import { getBoardDimensions } from "../../constants/snake";

type BoardRow = React.FC[];
type Board = BoardRow[];
interface RowProps {
  row: BoardRow;
}
interface Props {
  board: Board;
}

const Row = ({ row }: RowProps) => (
  <View style={styles.row}>{row.map((cell: React.FC) => cell)}</View>
);

const SnakeBoard = ({ board }: Props) => {
  const { width, height } = getBoardDimensions();

  return (
    <View style={[styles.container, { width: width, height: height }]}>
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
