import React from "react";
import { View, Text } from "react-native";
import board from "./index";
import {
  missingStateValidation,
  minimumColumnsAndRowsValues
} from "../common.test";

const DummyCellComponent = () => (
  <View>
    <Text>a dummy cell</Text>
  </View>
);

describe("board", () => {
  describe("missing state", () => {
    missingStateValidation(board, {
      columns: 10,
      rows: 10,
      cell: DummyCellComponent
    });

    test("returns an error if the state doesn't contain 'cell'", () => {
      expect(() => {
        board({
          columns: 10,
          rows: 10,
          cell: undefined
        });
      }).toThrow();
    });
  });

  describe("minimum columns/rows values", () => {
    minimumColumnsAndRowsValues(board, {
      columns: 10,
      rows: 10,
      cell: DummyCellComponent
    });
  });

  describe("accepts any defined value of 'cell'", () => {
    test("does not return an error if 'cell' is a component", () => {
      expect(() => {
        board({
          columns: 10,
          rows: 10,
          cell: DummyCellComponent
        });
      }).not.toThrow();
    });

    test("does not return an error if 'cell' is a string", () => {
      expect(() => {
        board({
          columns: 10,
          rows: 10,
          cell: "x"
        });
      }).not.toThrow();
    });

    test("does not return an error if 'cell' is a number", () => {
      expect(() => {
        board({
          columns: 10,
          rows: 10,
          cell: 0
        });
      }).not.toThrow();
    });
  });

  describe("correct behaviour", () => {
    test("returns an array whose length is the number of rows", () => {
      const result = board({
        columns: 10,
        rows: 12,
        cell: DummyCellComponent
      });
      expect(result && result).toHaveLength(12);
    });

    test("returns an array whose items are arrays containing cells", () => {
      const result = board({
        columns: 20,
        rows: 10,
        cell: DummyCellComponent
      });

      expect(result && result[0]).toEqual(
        expect.arrayContaining([DummyCellComponent])
      );
    });

    test("returns an array whose items are arrays of length equal to the number of columns", () => {
      const result = board({
        columns: 15,
        rows: 12,
        cell: DummyCellComponent
      });

      expect(result && result[0]).toHaveLength(15);
    });
  });
});
