import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";
import nextGameState, {
  addMove,
  initBoard,
  CardinalDirections,
  GameStatus,
  GameState,
  EAST
} from "../../lib/snake";
import { defaultCellSize } from "../../constants/snake";
import { getBoardColumnsAndRows, getBoardDimensions } from "../../utils/snake";

import Board from "../../components/SnakeBoard";
import BoardCell from "../../components/SnakeBoard/Cell";
import Snake from "../../components/Snake";
import Apple from "../../components/SnakeApple";

import {
  useAnimationFrame,
  useGestureResponder,
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

  const { onStartShouldSetResponder, onResponderRelease } = useGestureResponder(
    onMoveUpdate
  );

  const board = initBoard(defaultState);
  const { width, height } = getBoardDimensions();

  return (
    <ScreenWrapper scrollable={false}>
      <View
        style={styles.container}
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
  container: {
    flex: 1
  }
});

export default SnakeScreen;
