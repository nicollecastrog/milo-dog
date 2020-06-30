import { GameStatus, State } from "../types";

const updateStatus = (state: State, status: GameStatus): State => ({
  ...state,
  status
});

export default updateStatus;
