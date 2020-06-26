import { Point } from "../types";

const random = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;

export const generatePoint = (columns: number, rows: number) => ({
  x: random(0, columns),
  y: random(0, rows)
});

export const randomPointIsBlocked = (point: Point, blocked: Point[]) =>
  !!blocked.find((el) => el.x === point.x && el.y === point.y);
