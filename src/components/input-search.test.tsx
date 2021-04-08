import React from "react";
import { render, screen } from "@testing-library/react";
import InputSearch from "./input-search";

test("renders input search", () => {
  render(<InputSearch onSearch={() => {}} />);
  const icon = screen.getByRole("img");
  expect(icon).toBeInTheDocument();
});
