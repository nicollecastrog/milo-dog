import {
  isUndefined,
  throwMissingParamError,
  throwBelowTenError
} from "./shared";

interface State {
  columns: number | undefined;
  rows: number | undefined;
  cell: any;
}

const board = ({ columns, rows, cell }: State) => {
  // state is fully defined
  if (isUndefined(columns)) {
    throwMissingParamError("columns");
  }
  if (isUndefined(rows)) {
    throwMissingParamError("rows");
  }
  if (isUndefined(cell)) {
    throwMissingParamError("cell");
  }

  if (!columns || !rows || !cell) {
    return;
  }

  // rows and columns cannot be less than 10, to allow for better gameplay
  if (rows < 10) {
    throwBelowTenError("rows");
  }
  if (columns < 10) {
    throwBelowTenError("columns");
  }

  const singleRow = Array.from(Array(columns), () => cell);
  const arrayOfRows = Array.from(Array(rows), () => singleRow);

  return arrayOfRows;
};

export default board;
