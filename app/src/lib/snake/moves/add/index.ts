import { CardinalDirections, State } from "../../types";
import isValidMove from "../valid";

const addMove = (state: State, move: CardinalDirections): State =>
  isValidMove(state, move)
    ? { ...state, moves: state.moves.concat([move]) }
    : state;

export default addMove;
