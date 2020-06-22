import React from "react";
import { View, Text } from "react-native";
import board from "./index";
import {
  missingStateValidation,
  minimumColumnsAndRowsValues
} from "../common.test";

const dummyCellCreator = () => (
  <View>
    <Text>a dummy cell</Text>
  </View>
);

describe("board", () => {
  describe("missing state", () => {
    missingStateValidation(board, {
      columns: 10,
      rows: 10,
      cell: dummyCellCreator
    });

    test("returns an error if the state doesn't contain 'cellCreator'", () => {
      expect(() => {
        board({
          columns: 10,
          rows: 10,
          cellCreator: undefined
        });
      }).toThrow();
    });
  });

  describe("minimum columns/rows values", () => {
    minimumColumnsAndRowsValues(board, {
      columns: 10,
      rows: 10,
      cellCreator: dummyCellCreator
    });
  });

  describe("correct behaviour", () => {
    test("returns an array whose length is the number of rows", () => {
      const result = board({
        columns: 10,
        rows: 12,
        cellCreator: dummyCellCreator
      });
      expect(result).toHaveLength(12);
    });

    test("returns an array whose items are arrays of length equal to the number of columns", () => {
      const result = board({
        columns: 15,
        rows: 12,
        cellCreator: dummyCellCreator
      });

      expect(result[0]).toHaveLength(15);
    });

    describe("'cellCreator'", () => {
      test("returns an array whose items are arrays containing the result of the 'cellCreator'", () => {
        const result = board({
          columns: 12,
          rows: 10,
          cellCreator: dummyCellCreator
        });

        expect(result[0]).toEqual(expect.arrayContaining([dummyCellCreator()]));
      });
    });
  });
});
