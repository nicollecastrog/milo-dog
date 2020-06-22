import { Point, throwIfInvalidBoard } from "../shared";

type CellCreator = (point: Point) => any;

interface State {
  columns: number | undefined;
  rows: number | undefined;
  cellCreator: CellCreator | undefined;
}

const board = ({ columns, rows, cellCreator }: State) => {
  // state is fully defined
  if (
    columns === undefined ||
    rows === undefined ||
    cellCreator === undefined
  ) {
    throw new Error("missing state param");
  }

  // rows and columns cannot be less than 10, to allow for better gameplay
  throwIfInvalidBoard(columns, rows);

  // main logic
  const createSingleRow = (y: number) =>
    Array.from(Array(columns), (_, i: number) => cellCreator({ x: i, y }));

  const arrayOfRows = Array.from(Array(rows), (_, i: number) =>
    createSingleRow(i)
  );

  return arrayOfRows;
};

export default board;
