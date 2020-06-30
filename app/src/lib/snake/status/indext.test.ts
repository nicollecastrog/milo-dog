import { dummyState } from "../shared";
import updateStatus from "./index";

describe("snake/status", () => {
  test("returns a state with an updated 'status'", () => {
    const result = updateStatus(dummyState, "won");

    expect(result.status).toEqual("won");
  });
});
