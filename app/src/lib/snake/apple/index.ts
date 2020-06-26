import { Point, State } from "../types";
import withValidState from "../withValidState";
import moveHead from "../snake/head";
import { generatePoint, pointIsBlocked, samePoint } from "../helpers";

const apple = (state: State): Point => {
  const { columns, rows, snake, apple: currentApple } = state;

  const blocked = snake;
  // handle if the whole board is blocked
  if (blocked.length === rows * columns) {
    throw new Error("Game over: no more free spaces for apples");
  }

  const nextHead = moveHead(state);
  const willEat = samePoint(currentApple, nextHead);
  if (!willEat) {
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
