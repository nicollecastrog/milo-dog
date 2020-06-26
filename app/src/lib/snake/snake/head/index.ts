import { Point, State } from "../../types";
import withValidState from "../../withValidState";
import { modulusWithWrapAfterBoundary } from "../../helpers";

const moveHead = ({ columns, rows, snake, moves }: State): Point => {
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
