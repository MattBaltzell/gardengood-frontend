import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import UserContext from "../auth/UserContext";

const user = {
  username: "testuser",
  firstName: "firstname",
  lastName: "lastname",
  email: "test@test.com",
  zipCode: "36830",
};
describe("Home component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <Home></Home>
      </MemoryRouter>
    );
  });

  it("renders without auth buttons anon", function () {
    render(
      <MemoryRouter>
        <Home></Home>
      </MemoryRouter>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
    expect(screen.getByAltText("GardenGood")).toBeInTheDocument();
  });

  it("renders without auth buttons when logged in", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Signup")).not.toBeInTheDocument();
    expect(screen.getByAltText("GardenGood")).toBeInTheDocument();
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
