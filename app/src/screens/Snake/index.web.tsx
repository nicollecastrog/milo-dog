import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";
import { initBoard, GameStatus, GameState, EAST } from "../../lib/snake";
import {
  defaultCellSize,
  getBoardColumnsAndRows,
  getBoardDimensions
} from "../../constants/snake";

import Board from "../../components/SnakeBoard";
import BoardCell from "../../components/SnakeBoard/Cell";
import Snake from "../../components/Snake";
import SnakeApple from "../../components/SnakeApple";

const { columns, rows } = getBoardColumnsAndRows();

const mutableState = {
  apple: { x: 6, y: 2 },
  moves: [EAST],
  snake: [
    { x: 2, y: 2 },
    { x: 3, y: 2 }
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
  const [state] = useState(mutableState);

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
