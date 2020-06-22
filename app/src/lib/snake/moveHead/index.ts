import { Point, CardinalDirections, EAST } from "../types";
import withValidState from "../withValidState";

interface State {
  columns: number;
  rows: number;
  snake: Array<Point>;
  moves: Array<CardinalDirections>;
}

const defaultState: State = {
  columns: 10,
  rows: 10,
  snake: [{ x: 2, y: 2 }],
  moves: [EAST]
};

const modulusWithWrapAfterBoundary = (position: number, boundary: number) =>
  ((position % boundary) + boundary) % boundary;

const moveHead = ({ columns, rows, snake, moves }: State) => {
  // snake[0] => the current head of the snake
  // moves[0] => the next pending cardinal move
  const nextSnakeX = snake[0].x + moves[0].x;
  const nextSnakeY = snake[0].y + moves[0].y;

  return {
    x: modulusWithWrapAfterBoundary(nextSnakeX, columns),
    y: modulusWithWrapAfterBoundary(nextSnakeY, rows)
  };
};

export default withValidState(moveHead, defaultState);
