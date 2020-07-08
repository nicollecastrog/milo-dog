import "react-native";
import React from "react";
import App from "./index";

jest.useFakeTimers();

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

describe("App", () => {
  it("renders correctly", () => {
    renderer.create(<App />);
  });
});
