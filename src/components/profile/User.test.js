import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import User from "./User";
import App from "../../App";

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
          <User />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <User />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
