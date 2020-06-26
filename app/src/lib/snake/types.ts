// moves
export interface North {
  x: 0;
  y: 1;
}

export interface South {
  x: 0;
  y: -1;
}

export interface East {
  x: 1;
  y: 0;
}

export interface West {
  x: -1;
  y: 0;
}

export type CardinalDirections = North | South | East | West;

// module state
export interface Point {
  x: number;
  y: number;
}

export type CellCreator = (point: Point) => any;

export interface State {
  columns: number;
  rows: number;
  apple: Point;
  cellCreator: CellCreator;
  moves: CardinalDirections[];
  snake: Point[];
}
