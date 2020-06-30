import { State } from "../../types";

const isBoardBlocked = ({ snake, rows, columns }: State): boolean =>
  snake.length === rows * columns;

export default isBoardBlocked;
