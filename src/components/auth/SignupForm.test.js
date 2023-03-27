import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SignupForm from "./SignupForm";

describe("SignupForm component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <SignupForm></SignupForm>
      </MemoryRouter>
    );
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays 'Required' errors when submitted with no input values", async function () {
    render(
      <MemoryRouter>
        <SignupForm></SignupForm>
      </MemoryRouter>
    );
    const buttonEl = screen.getByRole("button");
    fireEvent.click(buttonEl);
    const requiredErrors = await screen.findAllByText("Required");
    expect(requiredErrors.length).toEqual(6);
  });
});
