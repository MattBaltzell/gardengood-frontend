import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import UserContext from "../auth/UserContext";

const user = {
  username: "testuser",
  first_name: "firstname",
  last_name: "lastname",
  email: "test@test.com",
};
describe("Home component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <Home></Home>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when logged out", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={null}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
