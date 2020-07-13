# Snake Game Engine

The original inspiration for the Snake game engine was about building a version of the game where rather than an ever-expanding snake, you'd have an elongating sausage dog (my dog, Milo) eating treats.

But I wanted to build the game cleanly, ie: agnostic to the rendering/visuals and thoroughly unit-tested. So that's what you see here: a functional stateless game engine, that calculates the next state of the game based on the state passed to it.

## Highlights

#### `index.ts`
Exposes the main game engine entry function, which calculates the next positions of the snake and apple (among other things) according to the provided state.

This file exposes a few other things as well, namely the `addMove` function, which validates and adds moves to a supplied game state, essentially queueing them up for the next main game state calculation.

#### `/withValidState`
A higher-order function that wraps around every module involved in this game engine. The rationale behind this is that I wanted each module to be fully independent, accepting the same validated game state as its main argument. This means that the methods don't rely on being called in any particular order.

#### `/status`
Informs the consumer whether the game status is `"running"`, `"crashed"` (ie: the snake crashed against itself), or `"won"` (ie: the snake fully-occupies/blocks up the entire board).

It's worth noting that this version of the snake game assumes the snake can travel through the boundaries of the board.

#### `/snake`
Unsurprisingly, does a lot of the heavy-lifting of the whole game engine. The snake is conceptualised as an array of `{ x, y }` graph points, with the head at the 0th-index position.

The modules defined in this directory handle calculating the next position of the snake given its existing position, the next move to be handled, and whether said move will lead the snake to crashing, eating an apple, or simply moving along.

#### `/moves`
As you can see in the [`types`]("./types.ts"), a game move is one that +/- 1 in either the x or y direction (ie: north, south, east, or west).

The modules in this directory handle validating a move (the snake cannot go back on itself), adding valid moves to the queue (array), and proceeding to the next move (ie: removing the first move from the array).

#### `/board`
Exposes a simple function (`isBoardBlocked`) to determine if the board is fully blocked by the snake (meaning you've won the game, as mentioned above).

It also exposes a handy board initialisation function (`initBoard`), that the consumer can choose to use (or not) to produce an array of rows each containing an array of cells. The module makes no assumption as to what a "cell" is, it is up to the consumer to determine how to represent/render a cell.

#### `/apple`
Handles whether to simply return the existing/current apple or generate a new apple on a free board cell.
