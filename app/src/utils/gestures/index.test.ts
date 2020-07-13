import { getSwipeDirection } from "./index";

describe("utils/gestures", () => {
  describe("getSwipeDirection", () => {
    it(`should return null for taps
        (no swiping / distance travelled in any direction)`, () => {
      const direction = getSwipeDirection(50, 100, 50, 100);
      expect(direction).toBeNull();
    });

    it("should return right for left-to-right swipe", () => {
      const direction = getSwipeDirection(0, 0, 500, 0);
      expect(direction).toBe("right");
    });

    it("should return left for right-to-left swipe", () => {
      const direction = getSwipeDirection(0, 0, -500, 0);
      expect(direction).toBe("left");
    });

    it("should return up for bottom-to-top swipe", () => {
      const direction = getSwipeDirection(0, 0, 0, -500);
      expect(direction).toBe("up");
    });

    it("should return down for top-to-bottom swipe", () => {
      const direction = getSwipeDirection(0, 0, 0, 500);
      expect(direction).toBe("down");
    });

    describe("diagonal swipes", () => {
      it(`should return right for diagonal swipes where the distance
          going right is larger than the distance going up`, () => {
        const direction = getSwipeDirection(0, 0, 500, -400);
        expect(direction).toBe("right");
      });

      it(`should return right for diagonal swipes where the distance
          going right is larger than the distance going down`, () => {
        const direction = getSwipeDirection(0, 0, 500, 400);
        expect(direction).toBe("right");
      });

      it(`should return left for diagonal swipes where the distance
          going left is larger than the distance going up`, () => {
        const direction = getSwipeDirection(0, 0, -500, -400);
        expect(direction).toBe("left");
      });

      it(`should return left for diagonal swipes where the distance
          going left is larger than the distance going down`, () => {
        const direction = getSwipeDirection(0, 0, -500, 400);
        expect(direction).toBe("left");
      });

      it(`should return up for diagonal swipes where the distance
          going up is larger than the distance going right`, () => {
        const direction = getSwipeDirection(0, 0, 400, -500);
        expect(direction).toBe("up");
      });

      it(`should return up for diagonal swipes where the distance
          going up is larger than the distance going left`, () => {
        const direction = getSwipeDirection(0, 0, -400, -500);
        expect(direction).toBe("up");
      });

      it(`should return down for diagonal swipes where the distance
          going down is larger than the distance going right`, () => {
        const direction = getSwipeDirection(0, 0, 400, 500);
        expect(direction).toBe("down");
      });

      it(`should return down for diagonal swipes where the distance
          going down is larger than the distance going left`, () => {
        const direction = getSwipeDirection(0, 0, -400, 500);
        expect(direction).toBe("down");
      });
    });
  });
});
