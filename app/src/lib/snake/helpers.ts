import { CardinalDirections, Point } from "./types";

// Maths
const random = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;

export const modulusWithWrapAfterBoundary = (
  position: number,
  boundary: number
) => ((position % boundary) + boundary) % boundary;

// Points
export const generatePoint = (columns: number, rows: number) => ({
  x: random(0, columns),
  y: random(0, rows)
});

export const pointIsBlocked = (point: Point, blocked: Point[]) =>
  !!blocked.find((el) => el.x === point.x && el.y === point.y);

export const samePoint = (p1: Point, p2: Point) =>
  p1.x === p2.x && p1.y === p2.y;

// Arrays
export const dropFirst = (arr: CardinalDirections[]) => arr.slice(1);
export const dropEnd = (arr: Point[]) => arr.slice(0, arr.length - 1);

// Errors
export const throwBelowMinimumError = (
  data: string,
  minimumDimension: number
) => {
  throw new Error(
    `incorrect state param: ${data} cannot be below ${minimumDimension}`
  );
};
