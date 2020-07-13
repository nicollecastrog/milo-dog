import { State } from "../../types";
import { samePoint } from "../../helpers";
import moveHead from "../head";

const willEat = (state: State) => {
  const nextHead = moveHead(state);
  return samePoint(state.apple, nextHead);
};

export default willEat;
