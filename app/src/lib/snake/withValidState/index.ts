import { Point, CardinalDirections, CellCreator } from "../types";

interface State {
  columns: number | undefined;
  rows: number | undefined;
  blocked?: Array<Point> | undefined;
  cellCreator?: CellCreator | undefined;
  moves?: Array<CardinalDirections> | undefined;
  snake?: Array<Point> | undefined;
}

interface ValidatedState {
  columns: number;
  rows: number;
  blocked?: Array<Point>;
  cellCreator?: CellCreator;
  moves?: Array<CardinalDirections>;
  snake?: Array<Point>;
}

type StateParams = keyof ValidatedState;

const throwBelowTenError = (data: string) => {
  throw new Error(`incorrect state param: ${data} cannot be below 10`);
};

const withValidState = (
  moduleFunction: Function, // TODO: type this function more nicely
  defaultState: ValidatedState
) => (state: State): ((state: ValidatedState) => any) => {
  // state is fully defined
  const stateParams = Object.keys(defaultState);

  (stateParams as Array<StateParams>).map((property) => {
    if (state[property] === undefined) {
      throw new Error(`missing state param: ${property}`);
    }
  });

  // columns and rows cannot be less than 10, to allow for better gameplay
  if (state.columns && state.columns < 10) {
    throwBelowTenError("rows");
  }
  if (state.rows && state.rows < 10) {
    throwBelowTenError("columns");
  }

  return moduleFunction(state);
};

export default withValidState;
