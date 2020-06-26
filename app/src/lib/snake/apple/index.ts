import { Point, State } from "../types";
import withValidState from "../withValidState";
import { generatePoint, pointIsBlocked } from "../helpers";
import willEat from "../snake/eat";

const apple = (state: State): Point => {
  const { columns, rows, snake, apple: currentApple } = state;

  const blocked = snake;
  // handle if the whole board is blocked
  if (blocked.length === rows * columns) {
    throw new Error("Game over: no more free spaces for apples");
  }

  if (!willEat(state)) {
    return currentApple;
  }

  // generate random apple that does not land on snake (blocked points)
  let randomPoint = generatePoint(columns, rows);

  while (pointIsBlocked(randomPoint, blocked)) {
    randomPoint = generatePoint(columns, rows);
  }

  return randomPoint;
};

export default withValidState(apple);
