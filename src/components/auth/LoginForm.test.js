import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("displays 'Required' error when submitted with no input value", async function () {
    render(
      <MemoryRouter>
        <LoginForm></LoginForm>
      </MemoryRouter>
    );
    const buttonEl = screen.getByRole("button");
    fireEvent.click(buttonEl);
    const requiredErrors = await screen.findAllByText("Required");
    expect(requiredErrors.length).toEqual(2);
  });
});
