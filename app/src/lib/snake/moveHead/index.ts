import { Point, CardinalDirections } from "../types";
import withValidState from "../withValidState";

interface State {
  columns: number;
  rows: number;
  snake: Point[];
  moves: CardinalDirections[];
}

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

export default withValidState(moveHead);
