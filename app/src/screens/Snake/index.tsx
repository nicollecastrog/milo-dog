import React, { useState, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";
import nextGameState, {
  addMove,
  initBoard,
  CardinalDirections,
  GameStatus,
  GameState,
  Point,
  NORTH,
  EAST,
  SOUTH,
  WEST
} from "../../lib/snake";
import { defaultCellSize } from "../../constants/snake";
import { getBoardColumnsAndRows, getBoardDimensions } from "../../utils/snake";
import { getSwipeDirection } from "../../utils/gestures";

import Board from "../../components/SnakeBoard";
import BoardCell from "../../components/SnakeBoard/Cell";
import Snake from "../../components/Snake";
import Apple from "../../components/SnakeApple";

import {
  useAnimationFrame,
  useNativeKeyboardListener,
  useWebKeyboardListener
} from "./hooks";

const { columns, rows } = getBoardColumnsAndRows();

type MutableState = Pick<GameState, "apple" | "moves" | "snake" | "status">;

const mutableState: MutableState = {
  apple: { x: 6, y: 2 },
  moves: [EAST] as CardinalDirections[],
  snake: [
    { x: 3, y: 2 },
    { x: 2, y: 2 }
  ],
  status: "running" as GameStatus
};

const defaultState: GameState = {
  ...mutableState,
  columns,
  rows,
  cellCreator: BoardCell
};

const cardinalDirectionsDictionary = {
  up: NORTH,
  right: EAST,
  down: SOUTH,
  left: WEST
};

const SnakeScreen = () => {
  const [state, setState] = useState(mutableState);

  useAnimationFrame(() => {
    setState(
      (prevState: MutableState): MutableState => {
        const currentState = { ...defaultState, ...prevState };

        const newState = nextGameState(currentState);
        const { apple, moves, snake, status } = newState;

        return {
          ...prevState,
          ...{ apple, moves, snake, status }
        };
      }
    );
  });

  const onMoveUpdate = (move: CardinalDirections) => {
    const currentState = { ...defaultState, ...state };

    const newState = addMove(currentState, move);
    const { apple, moves, snake, status } = newState;

    setState({ apple, moves, snake, status });
  };

  /* eslint-disable react-hooks/rules-of-hooks */

  // React Hooks are not meant to be called conditionally, to ensure that
  // Hooks are called in the same order each time a component renders.

  // However here we know this condition will not change between renders
  // on a given device, so we disable the eslint rule instead.
  if (Platform.OS === "web") {
    useWebKeyboardListener(onMoveUpdate);
  } else {
    // TODO: useNativeKeyboardListener is only for ease of dev
    useNativeKeyboardListener(onMoveUpdate);
  }
  /* eslint-enable react-hooks/rules-of-hooks */

  const initialPanPosition = useRef<Point>({ x: 0, y: 0 });

  const onStartShouldSetResponder = ({ nativeEvent }: any) => {
    initialPanPosition.current = {
      x: nativeEvent.locationX,
      y: nativeEvent.locationY
    };
    return true;
  };

  const onResponderRelease = ({ nativeEvent }: any) => {
    const { x, y } = initialPanPosition.current;
    const { locationX, locationY } = nativeEvent;

    const swipeDirection = getSwipeDirection(x, y, locationX, locationY);
    swipeDirection &&
      onMoveUpdate(cardinalDirectionsDictionary[swipeDirection]);
  };

  const board = initBoard(defaultState);
  const { width, height } = getBoardDimensions();

  return (
    <ScreenWrapper scrollable={false}>
      <View
        style={styles.fullScreen}
        onStartShouldSetResponder={onStartShouldSetResponder}
        onResponderRelease={onResponderRelease}
      >
        <Board board={board} width={width} height={height} />
        <Snake
          snake={state.snake}
          cellSize={defaultCellSize}
          width={width}
          height={height}
        />
        <Apple
          apple={state.apple}
          cellSize={defaultCellSize}
          width={width}
          height={height}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100
  }
});

export default SnakeScreen;
