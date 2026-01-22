import { render, screen } from "@testing-library/react";

describe("Jest Smoke Test", () => {
  it("should confirm that tests can run", () => {
    // A very simple assertion that should always pass
    expect(1 + 1).toBe(2);
  });
});
