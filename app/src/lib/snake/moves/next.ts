import { State } from "../types";
import withValidState from "../withValidState";

const dropFirst = (arr: Array<any>) => arr.slice(1);

const nextMove = ({ moves }: State) =>
  // keep repeating the last move, if only one is present
  // otherwise, move on to the next one
  moves.length > 1 ? dropFirst(moves) : moves;

export default withValidState(nextMove);
