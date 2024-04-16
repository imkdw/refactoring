import { Calculator } from "../../src/chap02/Calculator";

describe("Calulator Test", () => {
  it("plus", () => {
    const result = Calculator.plus(1, 2);
    expect(result).toBe(3);
    expect(Calculator.plus(1, 4)).toBe(5);
  });
});
