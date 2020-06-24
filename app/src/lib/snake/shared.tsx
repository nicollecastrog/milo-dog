import React from "react";
import { View, Text } from "react-native";
import { North, South, East, West, Point } from "./types";

// moves
export const NORTH: North = { x: 0, y: 1 };
export const SOUTH: South = { x: 0, y: -1 };
export const EAST: East = { x: 1, y: 0 };
export const WEST: West = { x: -1, y: 0 };

// default game elements
export const defaultApple: Point = { x: 6, y: 2 };
export const defaultSnake: Array<Point> = [{ x: 2, y: 2 }];

// testing helpers
export const dummyCellCreator = () => (
  <View>
    <Text>a dummy cell</Text>
  </View>
);

export const boundaryEnd = 10;

export const dummyState = {
  columns: boundaryEnd,
  rows: boundaryEnd,
  apple: defaultApple,
  cellCreator: dummyCellCreator,
  moves: [EAST],
  snake: defaultSnake
};

export { dummyState as defaultState };
