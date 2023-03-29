import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SignupForm from "./SignupForm";
import App from "../../App";
import userEvent from "@testing-library/user-event";

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

  it("allows user to sign up", async function () {
    const signup = jest.fn().mockResolvedValue({});

    render(
      <MemoryRouter>
        <SignupForm signup={signup} />
      </MemoryRouter>
    );

    act(() => {
      userEvent.type(screen.getByTestId("username"), "tester1");
      userEvent.type(screen.getByTestId("email"), "tester1@test.com");
      userEvent.type(screen.getByTestId("password"), "password");
      userEvent.type(screen.getByTestId("firstname"), "Tester");
      userEvent.type(screen.getByTestId("lastname"), "One");
      userEvent.type(screen.getByTestId("zipcode"), "36830");
      userEvent.click(screen.getByText("Create Account"));
    });

    await waitFor(() =>
      expect(signup).toBeCalledWith({
        username: "tester1",
        email: "tester1@test.com",
        password: "password",
        firstName: "Tester",
        lastName: "One",
        zipCode: "36830",
      })
    );
  });
});
