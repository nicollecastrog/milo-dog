import { CellCreator } from "../types";
import withValidState from "../withValidState";

interface State {
  columns: number;
  rows: number;
  cellCreator: CellCreator;
}

const board = ({ columns, rows, cellCreator }: State) => {
  const createSingleRow = (y: number) =>
    Array.from(Array(columns), (_, i: number) => cellCreator({ x: i, y }));

  const arrayOfRows = Array.from(Array(rows), (_, i: number) =>
    createSingleRow(i)
  );

  return arrayOfRows;
};

export default withValidState(board);
