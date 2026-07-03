import React, { ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components"; // example
import { store } from "../src/app/store"; // your Redux store
import theme from "../src/theme";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult & { store: typeof store } {
  const view = render(ui, { wrapper: AllTheProviders, ...options });
  return { ...view, store };
}

export * from "@testing-library/react";
export { customRender as render };
