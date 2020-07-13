import { GameStatus, State } from "../types";
import { isBoardBlocked } from "../board";
import withValidState from "../withValidState";
import willCrash from "../snake/crash";

const updateStatus = (state: State): GameStatus => {
  if (isBoardBlocked(state)) {
    return "won";
  }

  if (willCrash(state)) {
    return "crashed";
  }

  return "running";
};

export default withValidState(updateStatus);
