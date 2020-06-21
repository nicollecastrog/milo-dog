export interface Point {
  x: number;
  y: number;
}

const throwBelowTenError = (data: string) => {
  throw new Error(`incorrect state param: ${data} cannot be below 10`);
};

// columns and rows cannot be less than 10, to allow for better gameplay
export const throwIfInvalidBoard = (columns: number, rows: number) => {
  if (rows < 10) {
    throwBelowTenError("rows");
  }
  if (columns < 10) {
    throwBelowTenError("columns");
  }
};
