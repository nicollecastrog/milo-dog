import { State } from "../../types";
import withValidState from "../../withValidState";

type Board = any[][];

const initBoard = ({ columns, rows, cellCreator }: State): Board => {
  const createSingleRow = (y: number) =>
    Array.from(Array(columns), (_, i: number) => cellCreator({ x: i, y }));

  const arrayOfRows = Array.from(Array(rows), (_, i: number) =>
    createSingleRow(i)
  );

  return arrayOfRows;
};

export default withValidState(initBoard);
