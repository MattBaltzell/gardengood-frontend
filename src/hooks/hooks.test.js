import { renderHook } from "@testing-library/react";
import useLoading from "./useLoading";

describe("useLoading", () => {
  it("should return the initial value for loading", async () => {
    const { result } = renderHook(() => useLoading());
    const [isLoading] = result.current;

    expect(isLoading).toBe(true);
  });
});
