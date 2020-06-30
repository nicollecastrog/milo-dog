import { State } from "./types";
import withValidState from "./withValidState";

import { initBoard } from "./board";
import { addMove, nextMove } from "./moves";

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

export { initBoard, addMove };

export default withValidState(nextState);
