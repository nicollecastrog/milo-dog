import { GameStatus as Status, Point as GraphPoint, State } from "./types";
import withValidState from "./withValidState";

import { initBoard } from "./board";
import { addMove, nextMove } from "./moves";
import { NORTH, SOUTH, EAST, WEST } from "./shared";

import updateApple from "./apple";
import updateSnake from "./snake";
import updateStatus from "./status";

const nextState = (state: State) => ({
  ...state,
  apple: updateApple(state),
  moves: nextMove(state),
  snake: updateSnake(state),
  status: updateStatus(state)
});

export { initBoard, addMove, NORTH, SOUTH, EAST, WEST };
export type GameStatus = Status;
export type Point = GraphPoint;
export type GameState = State;

export default withValidState(nextState);
