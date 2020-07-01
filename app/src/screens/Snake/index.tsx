import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";
import { initBoard, GameStatus, EAST } from "../../lib/snake";
import { getBoardColumnsAndRows } from "../../constants/snake";

import Board from "../../components/SnakeBoard";
import BoardCell from "../../components/SnakeBoard/Cell";

const { columns, rows } = getBoardColumnsAndRows();

const defaultState = {
  columns,
  rows,
  apple: { x: 6, y: 2 },
  cellCreator: BoardCell,
  moves: [EAST],
  snake: [{ x: 2, y: 2 }],
  status: "running" as GameStatus
};

const SnakeScreen = () => {
  const board = initBoard(defaultState);

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.fullScreen}>
        <SafeAreaView style={styles.container}>
          <Board board={board} />
        </SafeAreaView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SnakeScreen;
