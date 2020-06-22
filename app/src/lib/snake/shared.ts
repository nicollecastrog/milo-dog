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

// moves
interface North {
  x: 0;
  y: 1;
}

interface South {
  x: 0;
  y: -1;
}

interface East {
  x: 1;
  y: 0;
}

interface West {
  x: -1;
  y: 0;
}

export type CardinalDirections = North | South | East | West;

export const NORTH: North = { x: 0, y: 1 };
export const SOUTH: South = { x: 0, y: -1 };
export const EAST: East = { x: 1, y: 0 };
export const WEST: West = { x: -1, y: 0 };
