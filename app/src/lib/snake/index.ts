import { State } from "./types";
import updateApple from "./apple";
import { initBoard } from "./board";
import { addMove, nextMove } from "./moves";
import updateSnake from "./snake";
import withValidState from "./withValidState";

const nextState = (state: State) => ({
  ...state,
  apple: updateApple(state),
  moves: nextMove(state),
  snake: updateSnake(state)
});

export { initBoard, addMove };

export default withValidState(nextState);
