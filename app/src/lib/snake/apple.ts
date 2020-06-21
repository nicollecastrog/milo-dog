import { throwIfInvalidBoard, Point } from "./shared";

interface State {
  columns: number | undefined;
  rows: number | undefined;
  blocked: Array<Point> | undefined;
}

// helper functions
const random = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;

const generatePoint = (columns: number, rows: number) => ({
  x: random(0, columns),
  y: random(0, rows)
});

const randomPointIsBlocked = (point: Point, blocked: Array<Point>) =>
  !!blocked.find((el) => el.x === point.x && el.y === point.y);

// main function
const apple = ({ columns, rows, blocked }: State) => {
  // state is fully defined
  if (columns === undefined || rows === undefined || blocked === undefined) {
    throw new Error("missing state param");
  }

  // columns and rows cannot be less than 10, to allow for better gameplay
  throwIfInvalidBoard(columns, rows);

  // handle if the whole board is blocked
  if (blocked.length === rows * columns) {
    throw new Error("Game over: no more free spaces for apples");
  }

  // generate random apple that does not land on snake (blocked points)
  let randomPoint = generatePoint(columns, rows);

  while (randomPointIsBlocked(randomPoint, blocked)) {
    randomPoint = generatePoint(columns, rows);
  }

  return randomPoint;
};

export default apple;
