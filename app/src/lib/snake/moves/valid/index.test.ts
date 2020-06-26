import { NORTH, SOUTH, EAST, WEST, dummyState } from "../../shared";
import validMove from "./index";

describe("moves/valid", () => {
  describe("move SOUTH", () => {
    test("returns false when move SOUTH follows move NORTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [NORTH]
        },
        SOUTH
      );
      expect(result).toBeFalse();
    });

    test("returns true when move SOUTH follows move SOUTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [SOUTH]
        },
        SOUTH
      );
      expect(result).toBeTrue();
    });

    test("returns true when move SOUTH follows move EAST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [EAST]
        },
        SOUTH
      );
      expect(result).toBeTrue();
    });

    test("returns true when move SOUTH follows move WEST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [WEST]
        },
        SOUTH
      );
      expect(result).toBeTrue();
    });
  });

  describe("move NORTH", () => {
    test("returns true when move NORTH follows move NORTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [NORTH]
        },
        NORTH
      );
      expect(result).toBeTrue();
    });

    test("returns false when move NORTH follows move SOUTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [SOUTH]
        },
        NORTH
      );
      expect(result).toBeFalse();
    });

    test("returns true when move NORTH follows move EAST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [EAST]
        },
        NORTH
      );
      expect(result).toBeTrue();
    });

    test("returns true when move NORTH follows move WEST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [WEST]
        },
        NORTH
      );
      expect(result).toBeTrue();
    });
  });

  describe("move WEST", () => {
    test("returns true when move WEST follows move NORTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [NORTH]
        },
        WEST
      );
      expect(result).toBeTrue();
    });

    test("returns true when move WEST follows move SOUTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [SOUTH]
        },
        WEST
      );
      expect(result).toBeTrue();
    });

    test("returns false when move WEST follows move EAST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [EAST]
        },
        WEST
      );
      expect(result).toBeFalse();
    });

    test("returns true when move WEST follows move WEST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [WEST]
        },
        WEST
      );
      expect(result).toBeTrue();
    });
  });

  describe("move EAST", () => {
    test("returns true when move EAST follows move NORTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [NORTH]
        },
        EAST
      );
      expect(result).toBeTrue();
    });

    test("returns true when move EAST follows move SOUTH", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [SOUTH]
        },
        EAST
      );
      expect(result).toBeTrue();
    });

    test("returns true when move EAST follows move EAST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [EAST]
        },
        EAST
      );
      expect(result).toBeTrue();
    });

    test("returns false when move EAST follows move WEST", () => {
      const result = validMove(
        {
          ...dummyState,
          moves: [WEST]
        },
        EAST
      );
      expect(result).toBeFalse();
    });
  });
});
