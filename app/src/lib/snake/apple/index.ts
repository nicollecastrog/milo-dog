import { throwIfInvalidBoard, Point } from "../shared";
import { generatePoint, randomPointIsBlocked } from "./helpers";

interface State {
  columns: number | undefined;
  rows: number | undefined;
  blocked: Array<Point> | undefined;
}

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
