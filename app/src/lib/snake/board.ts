interface State {
  columns: number | undefined;
  rows: number | undefined;
  cell: any;
}

const isUndefined = (data: any) => data === undefined;

const throwMissingParamError = (data: string) => {
  throw new Error(`missing state param: ${data}`);
};

const throwBelowTenError = (data: string) => {
  throw new Error(`incorrect state param: ${data} cannot be below 10`);
};

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

  // rows and columns cannot be less than 10, to allow for better gameplay
  if (rows && rows < 10) {
    throwBelowTenError("rows");
  }
  if (columns && columns < 10) {
    throwBelowTenError("columns");
  }

  const singleRow = Array.from(Array(columns), () => cell);
  const arrayOfRows = Array.from(Array(rows), () => singleRow);

  return arrayOfRows;
};

export default board;
