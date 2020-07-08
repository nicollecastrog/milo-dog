import { Dimensions } from "react-native";
import { Point } from "../lib/snake";

export const defaultCellSize = 30;
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

export const calculateTopAndLeft = ({ x, y }: Point, height: number) => {
  return {
    // as we draw from left -> right, x * defaultCellSize
    // gives the correct starting point for the cell
    left: x * defaultCellSize,
    // as graphs (and our game engine) interpret "y" values increasing going up,
    // but layout engines interpet "y" values increasing going down,
    // we need to flip the "y" around, and take into account that
    // we draw from top -> bottom, so we need to remove an additional cell space
    // to start the drawing of the cell in the right place,
    // that way the drawing *ends* at "height - y * defaultCellSize"
    top: height - y * defaultCellSize - defaultCellSize
  };
};
