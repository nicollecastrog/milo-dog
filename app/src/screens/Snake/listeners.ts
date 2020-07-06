import { useEffect } from "react";
import { Platform } from "react-native";
import KeyEvent from "react-native-keyevent";
import { NORTH, SOUTH, EAST, WEST } from "../../lib/snake";

// nativeKeyboardListener is only for dev
export const nativeKeyboardListener = (callback: Function) => {
  KeyEvent.onKeyUpListener((keyEvent: any) => {
    if (Platform.OS === "android") {
      const up = 19; // react-native-keyevent only supports arrow keys on Android
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

const useKeyDown = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [callback]);
};

export const useWebKeyboardListener = (callback: Function) => {
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
