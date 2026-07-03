import { renderHook, act } from "@testing-library/react";
import useCounter from "../hooks/useCounter"; // example hook

describe("useCounter", () => {
  it("returns initial count", () => {
    const { result } = renderHook(() => useCounter(0));

    expect(result.current.count).toBe(0);
  });

  it("increments the count", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(6);
  });

  it("decrements the count", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });

  it("fetches data and updates state", async () => {
    const { result } = renderHook(() => useCounter(0));

    await act(async () => {});
  });
});
