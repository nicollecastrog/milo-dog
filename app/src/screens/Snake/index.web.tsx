import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";
import nextGameState, {
  addMove,
  initBoard,
  CardinalDirections,
  GameStatus,
  GameState,
  EAST
} from "../../lib/snake";
import {
  defaultCellSize,
  getBoardColumnsAndRows,
  getBoardDimensions
} from "../../constants/snake";

import Board from "../../components/SnakeBoard";
import BoardCell from "../../components/SnakeBoard/Cell";
import Snake from "../../components/Snake";
import SnakeApple from "../../components/SnakeApple";

import { useWebKeyboardListener } from "./listeners";

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

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const gameLoop = (currentTime: number) => {
    if (currentTime - previousTimeRef.current > 100) {
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
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
      previousTimeRef.current = currentTime;
    }
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // From React docs: If you want to run an effect and clean it up only once
  // (on mount and unmount), you can pass an empty array as a second argument
  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop); // initialise gameLoop
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useWebKeyboardListener((move: CardinalDirections) => {
    const currentState = { ...defaultState, ...state };

    const newState = addMove(currentState, move);
    const { apple, moves, snake, status } = newState;

    setState({ apple, moves, snake, status });
  });

  const board = initBoard(defaultState);
  const { width, height } = getBoardDimensions();

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.fullScreen}>
        <Board board={board} width={width} height={height} />
        <Snake
          snake={state.snake}
          cellSize={defaultCellSize}
          width={width}
          height={height}
        />
        <SnakeApple
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
