import { throwIfInvalidBoard } from "../shared";

interface State {
  columns: number | undefined;
  rows: number | undefined;
  cell: any;
}

const board = ({ columns, rows, cell }: State) => {
  // state is fully defined
  if (columns === undefined || rows === undefined || cell === undefined) {
    throw new Error("missing state param");
  }

  // rows and columns cannot be less than 10, to allow for better gameplay
  throwIfInvalidBoard(columns, rows);

  const singleRow = Array.from(Array(columns), () => cell);
  const arrayOfRows = Array.from(Array(rows), () => singleRow);

  return arrayOfRows;
};

export default board;
