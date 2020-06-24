import { Point, CardinalDirections, CellCreator } from "../types";

interface ValidatedState {
  columns: number;
  rows: number;
  blocked?: Array<Point>;
  cellCreator?: CellCreator;
  moves?: Array<CardinalDirections>;
  snake?: Array<Point>;
  apple?: Point;
}

type StateParams = keyof ValidatedState;

const throwBelowTenError = (data: string) => {
  throw new Error(`incorrect state param: ${data} cannot be below 10`);
};

function withValidState<T extends (...args: any[]) => any>(
  moduleFunction: T
): (...moduleFunctionArgs: Parameters<T>) => ReturnType<T> {
  // Return a new function that throws if the moduleFunction state isn't fully defined
  return (...args: Parameters<T>): ReturnType<T> => {
    // state is fully defined
    const state = args[0];
    const stateParams = Object.keys(state);

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

    return moduleFunction(...args);
  };
}

export default withValidState;
