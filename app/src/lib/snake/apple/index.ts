import { Point, State } from "../types";
import withValidState from "../withValidState";
import { generatePoint, randomPointIsBlocked } from "./helpers";

const apple = ({ columns, rows, snake }: State): Point => {
  const blocked = snake;
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

export default withValidState(apple);
