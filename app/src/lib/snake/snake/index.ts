import { Point, State } from "../types";
import { defaultSnake } from "../shared";
import withValidState from "../withValidState";
import moveHead from "../moveHead";

const samePoint = (p1: Point, p2: Point) => p1.x === p2.x && p1.y === p2.y;
const dropEnd = (arr: Array<any>) => arr.slice(0, arr.length - 1);

const snake = (state: State) => {
  const nextHead = moveHead(state);

  const willCrash = !!state.snake.find((point) => samePoint(point, nextHead));
  if (willCrash) {
    return defaultSnake; // TODO: throw error? "freeze" game upon crash?
  }

  const willEat = samePoint(state.apple, nextHead);
  if (willEat) {
    // add a new head, but don't remove the end of the tail, this elongates the snake
    return [nextHead].concat(state.snake);
  }

  // add a new head, and remove the end of the tail,
  // this moves the snake along the chosen direction, whilst keeping the same length of snake
  return [nextHead].concat(dropEnd(state.snake));
};

export default withValidState(snake);
