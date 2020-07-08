import { SwipeDirection } from "../../types/gestures";

export const getSwipeDirection = (
  previousX: number,
  previousY: number,
  currentX: number,
  currentY: number
): SwipeDirection | null => {
  const deltaX = currentX - previousX;
  const deltaY = currentY - previousY;

  const absoluteX = Math.abs(deltaX);
  const absoluteY = Math.abs(deltaY);

  if (absoluteX > absoluteY) {
    return deltaX > 0 ? "right" : "left";
  }

  if (absoluteY > absoluteX && deltaY < 0) {
    return "up";
  }

  if (absoluteY > absoluteX && deltaY > 0) {
    return "down";
  }

  return null;
};
