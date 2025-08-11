import { describe,it,expect } from "vitest";
import { AdaptiveSoul } from "../src/being/adaptiveSoul";
describe("AdaptiveSoul", () => {
  it("relaxoi kohti basea", () => {
    const s = new AdaptiveSoul("X", 440, true);
    (s as any).currentFreq = 600;
    s["relax"]();
    expect(s.frequency()).toBeLessThan(600);
  });
});
