import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UpdateUserForm from "./UpdateUserForm";

import UserContext from "../auth/UserContext";

const user = {
  username: "testuser",
  email: "test@test.com",
  firstName: "firstname",
  lastName: "lastname",
  zipCode: "36830",
  joinAt: "2023-03-03 18:24:48.215773",
  isAdmin: false,
};

describe("User component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <UpdateUserForm />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <UpdateUserForm />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("gives error if invalid input", async function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <UpdateUserForm />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const lastNameInput = screen.getByDisplayValue("lastname");
    fireEvent.change(lastNameInput, { target: { value: "" } });
    const buttonEl = screen.getByRole("button");
    fireEvent.click(buttonEl);
    const requiredError = await screen.findByText("Required");
    expect(requiredError).toBeInTheDocument();
    const requiredErrors = await screen.findAllByText("Required");
    expect(requiredErrors.length).toEqual(1);
  });
});
