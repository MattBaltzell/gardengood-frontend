import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginForm from "./LoginForm";

describe("LoginForm component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <LoginForm></LoginForm>
      </MemoryRouter>
    );
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("submits");
});
