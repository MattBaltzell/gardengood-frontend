import React from "react";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("allows user to log in", async function () {
    const login = jest.fn().mockResolvedValue({});

    render(
      <MemoryRouter>
        <LoginForm login={login} />
      </MemoryRouter>
    );
    act(() => {
      userEvent.type(screen.getByTestId("username"), "tester1");
      userEvent.type(screen.getByTestId("password"), "password");
      userEvent.click(screen.getByText("Log In"));
    });

    await waitFor(() =>
      expect(login).toBeCalledWith({
        username: "tester1",
        password: "password",
      })
    );
  });
});
