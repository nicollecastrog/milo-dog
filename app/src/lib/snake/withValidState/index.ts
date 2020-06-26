import { minimumDimension, defaultState } from "../shared";

const throwBelowMinimumError = (data: string) => {
  throw new Error(
    `incorrect state param: ${data} cannot be below ${minimumDimension}`
  );
};

function withValidState<T extends (...args: any[]) => any>(moduleFunction: T) {
  // Return a new function that throws if the moduleFunction state isn't fully defined
  return (...args: Parameters<T>): ReturnType<T> => {
    // state is fully defined
    const state = args[0];

    Object.keys(defaultState).map((property) => {
      if (state[property] === undefined) {
        throw new Error(`missing state param: ${property}`);
      }
    });

    // columns and rows cannot be less than ${minimumDimension}, to allow for better gameplay
    if (state.columns < minimumDimension) {
      throwBelowMinimumError("columns");
    }
    if (state.rows < minimumDimension) {
      throwBelowMinimumError("rows");
    }

    return moduleFunction(...args);
  };
}

export default withValidState;
