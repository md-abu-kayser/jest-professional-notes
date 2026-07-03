import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import MyComponent from "./MyComponent";
describe("MyComponent", () => {
  it("renders a heading", () => {
    render(<MyComponent title="Hello" />);

    const heading = screen.getByRole("heading", { name: /hello/i });
    expect(heading).toBeInTheDocument();
  });

  it("calls onClick handler when button is clicked", () => {
    const handleClick = jest.fn();
    render(<MyComponent title="Test" onAction={handleClick} />);

    const button = screen.getByRole("button", { name: /action/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("displays async data", async () => {
    render(<MyComponent title="Async" fetchData={async () => "Loaded"} />);

    const loadedText = await screen.findByText(/loaded/i);
    expect(loadedText).toBeInTheDocument();
  });
});
