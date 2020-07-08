import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import KeyEvent from "react-native-keyevent";
import { CardinalDirections, NORTH, SOUTH, EAST, WEST } from "../../lib/snake";

const useNativeKeyUp = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    // use KeyUp rather than KeyDown:
    // react-native-keyevent only supports KeyUp on iOS
    KeyEvent.onKeyUpListener(callback);
    return () => KeyEvent.removeKeyUpListener();
  }, [callback]);
};

// nativeKeyboardListener is only for dev
export const useNativeKeyboardListener = (
  callback: (move: CardinalDirections) => void
) => {
  useNativeKeyUp((keyEvent: any) => {
    if (Platform.OS === "android") {
      // react-native-keyevent only supports arrow keys on Android
      const up = 19;
      const left = 21;
      const down = 20;
      const right = 22;

      switch (keyEvent.keyCode) {
        case up:
          callback(NORTH);
          break;
        case left:
          callback(WEST);
          break;
        case down:
          callback(SOUTH);
          break;
        case right:
          callback(EAST);
          break;
      }
    }

    switch (keyEvent.pressedKey) {
      case "w":
        callback(NORTH);
        break;
      case "a":
        callback(WEST);
        break;
      case "s":
        callback(SOUTH);
        break;
      case "d":
        callback(EAST);
        break;
    }
  });
};

export const useAnimationFrame = (callback: Function) => {
  // Use `useRef` for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const animationLoop = (currentTime: number) => {
    if (currentTime - previousTimeRef.current > 100) {
      callback();
      previousTimeRef.current = currentTime;
    }
    // continuosly re-trigger animationLoop & update reference to it
    requestRef.current = requestAnimationFrame(animationLoop);
  };

  // From React docs: If you want to run an effect and clean it up only once
  // (on mount and unmount), you can pass an empty array as a second argument
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationLoop); // initialise animationLoop
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

const useKeyDown = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [callback]);
};

export const useWebKeyboardListener = (
  callback: (move: CardinalDirections) => void
) => {
  useKeyDown((event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        callback(NORTH);
        break;
      case "a":
      case "ArrowLeft":
        callback(WEST);
        break;
      case "s":
      case "ArrowDown":
        callback(SOUTH);
        break;
      case "d":
      case "ArrowRight":
        callback(EAST);
        break;
    }
  });
};
