import { Point, State } from "../types";
import { defaultSnake } from "../shared";
import withValidState from "../withValidState";
import { samePoint, dropEnd } from "../helpers";

import moveHead from "./head";
import willEat from "./eat";
import updateStatus from "../status";

const snake = (state: State): Point[] => {
  const nextHead = moveHead(state);

  const willCrash = !!state.snake.find((point) => samePoint(point, nextHead));
  if (willCrash) {
    updateStatus(state, "crashed");
    return defaultSnake;
  }

  if (willEat(state)) {
    // add a new head, but don't remove the end of the tail, this elongates the snake
    return [nextHead].concat(state.snake);
  }

  // add a new head, and remove the end of the tail,
  // this moves the snake along the chosen direction, whilst keeping the same length of snake
  return [nextHead].concat(dropEnd(state.snake));
};

export default withValidState(snake);
