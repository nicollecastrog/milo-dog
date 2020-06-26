import { CardinalDirections, State } from "../types";
import withValidState from "../withValidState";

const validMove = ({ moves }: State, move: CardinalDirections): boolean => {
  const latestMove = moves[moves.length - 1];
  // prevent snake from doubling back on itself
  return latestMove.x + move.x !== 0 || latestMove.y + move.y !== 0;
};

export default withValidState(validMove);
