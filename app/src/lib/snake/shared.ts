export interface Point {
  x: number;
  y: number;
}

export const isUndefined = (data: any) => data === undefined;

export const throwMissingParamError = (data: string) => {
  throw new Error(`missing state param: ${data}`);
};

export const throwBelowTenError = (data: string) => {
  throw new Error(`incorrect state param: ${data} cannot be below 10`);
};
