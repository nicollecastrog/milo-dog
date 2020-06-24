import { boundaryEnd, defaultState } from "../shared";

const throwBelowBoundaryMinimumError = (data: string) => {
  throw new Error(`incorrect state param: ${data} cannot be below 10`);
};

function withValidState<T extends (...args: any[]) => any>(
  moduleFunction: T
): (...moduleFunctionArgs: Parameters<T>) => ReturnType<T> {
  // Return a new function that throws if the moduleFunction state isn't fully defined
  return (...args: Parameters<T>): ReturnType<T> => {
    // state is fully defined
    const state = args[0];

    Object.keys(defaultState).map((property) => {
      if (state[property] === undefined) {
        throw new Error(`missing state param: ${property}`);
      }
    });

    // columns and rows cannot be less than ${boundaryEnd}, to allow for better gameplay
    if (state.columns && state.columns < boundaryEnd) {
      throwBelowBoundaryMinimumError("rows");
    }
    if (state.rows && state.rows < boundaryEnd) {
      throwBelowBoundaryMinimumError("columns");
    }

    return moduleFunction(...args);
  };
}

export default withValidState;
