import { Dimensions } from "react-native";

const defaultCellSize = 30;
const boardPaddingHorizontal = 40; // 20 on either side

const getBoardWidth = () => Dimensions.get("window").width;
const getBoardHeight = () => Dimensions.get("window").height;

const getWindowDimensions = () => ({
  width: getBoardWidth() - boardPaddingHorizontal,
  height: getBoardHeight()
});

export const getBoardColumnsAndRows = () => {
  const { width, height } = getWindowDimensions();

  const defaultColumns = Math.floor(width / defaultCellSize);
  const defaultRows = Math.floor(height / defaultCellSize);

  // board looks a bit weird when it's super tall or wide
  const idealAspectRatio = 1.3;
  const aspectRatio = defaultColumns / defaultRows;
  const adjustedColumnsForAspectRatio = Math.floor(
    defaultRows * (1 / idealAspectRatio)
  );
  const adjustedRowsForAspectRatio = Math.floor(
    defaultColumns * idealAspectRatio
  );

  return {
    columns:
      aspectRatio > idealAspectRatio &&
      adjustedColumnsForAspectRatio < defaultColumns
        ? adjustedColumnsForAspectRatio
        : defaultColumns,
    rows:
      aspectRatio < idealAspectRatio && adjustedRowsForAspectRatio < defaultRows
        ? adjustedRowsForAspectRatio
        : defaultRows
  };
};

export const getBoardDimensions = () => {
  const { columns, rows } = getBoardColumnsAndRows();
  return {
    width: columns * defaultCellSize,
    height: rows * defaultCellSize
  };
};
