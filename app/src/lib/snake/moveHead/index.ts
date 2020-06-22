import { throwIfInvalidBoard, Point, CardinalDirections } from "../shared";

interface State {
  columns: number | undefined;
  rows: number | undefined;
  snake: Array<Point> | undefined;
  moves: Array<CardinalDirections> | undefined;
}

const moveHead = ({ columns, rows, snake, moves }: State) => {
  // state is fully defined
  if (
    columns === undefined ||
    rows === undefined ||
    snake === undefined ||
    moves === undefined
  ) {
    throw new Error("missing state param");
  }

  // columns and rows cannot be less than 10, to allow for better gameplay
  throwIfInvalidBoard(columns, rows);

  // main logic
  const modulusWithWrapAfterBoundary = (position: number, boundary: number) =>
    ((position % boundary) + boundary) % boundary;

  // snake[0] => the current head of the snake
  // moves[0] => the next pending cardinal move
  const nextSnakeX = snake[0].x + moves[0].x;
  const nextSnakeY = snake[0].y + moves[0].y;

  return {
    x: modulusWithWrapAfterBoundary(nextSnakeX, columns),
    y: modulusWithWrapAfterBoundary(nextSnakeY, rows)
  };
};

export default moveHead;
