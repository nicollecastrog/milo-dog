import { GameStatus, State } from "../types";
import { isBoardBlocked } from "../board";
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

export default updateStatus;
