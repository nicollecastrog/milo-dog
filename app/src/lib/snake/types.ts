export interface Point {
  x: number;
  y: number;
}

export type CellCreator = (point: Point) => any;

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