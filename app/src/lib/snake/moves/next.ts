import { CardinalDirections, State } from "../types";
import withValidState from "../withValidState";

const dropFirst = (arr: CardinalDirections[]) => arr.slice(1);

const nextMove = ({ moves }: State): CardinalDirections[] =>
  // keep repeating the last move, if only one is present
  // otherwise, move on to the next one
  moves.length > 1 ? dropFirst(moves) : moves;

export default withValidState(nextMove);
