import { State } from "../../types";
import { samePoint } from "../../helpers";
import moveHead from "../head";

const willCrash = (state: State): boolean => {
  const nextHead = moveHead(state);
  return !!state.snake.find((point) => samePoint(point, nextHead));
};

export default willCrash;
