import { State } from "../types";
import withValidState from "../withValidState";

type Board = any[][];

const board = ({ columns, rows, cellCreator }: State): Board => {
  const createSingleRow = (y: number) =>
    Array.from(Array(columns), (_, i: number) => cellCreator({ x: i, y }));

  const arrayOfRows = Array.from(Array(rows), (_, i: number) =>
    createSingleRow(i)
  );

  return arrayOfRows;
};

export default withValidState(board);
