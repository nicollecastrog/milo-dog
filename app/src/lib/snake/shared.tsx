import React from "react";
import { View, Text } from "react-native";
import { North, South, East, West, Point, GameStatus } from "./types";

// moves
export const NORTH: North = { x: 0, y: 1 };
export const SOUTH: South = { x: 0, y: -1 };
export const EAST: East = { x: 1, y: 0 };
export const WEST: West = { x: -1, y: 0 };

// default game elements
export const defaultApple: Point = { x: 6, y: 2 };
export const defaultSnake: Point[] = [{ x: 2, y: 2 }];

// testing helpers
export const createLongSnake = (n: number) => {
  let longSnake = [];
  for (let x = 0; x < n; x++) {
    // Runs n times, with values of x 0 through n
    for (let y = 0; y < n; y++) {
      // Runs n times, with values of y 0 through n
      longSnake.push({ x: x, y: y });
    }
  }
  return longSnake;
};

export const dummyCellCreator = () => (
  <View>
    <Text>a dummy cell</Text>
  </View>
);

export const minimumDimension = 10;

export const dummyState = {
  columns: minimumDimension,
  rows: minimumDimension,
  apple: defaultApple,
  cellCreator: dummyCellCreator,
  moves: [EAST],
  snake: defaultSnake,
  status: "running" as GameStatus
};

// default game state
export { dummyState as defaultState };
