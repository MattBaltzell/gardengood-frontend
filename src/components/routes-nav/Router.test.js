import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Router from "./Router";
import App from "../../App";
import UserContext from "../auth/UserContext";

const user = {
  username: "testuser",
  first_name: "firstname",
  last_name: "lastname",
  email: "test@test.com",
};

describe("Router component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <Router />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when logged out", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={null}>
          <Router />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("redirects to login anon", function () {
    render(
      <MemoryRouter initialEntries={["/plants"]}>
        <UserContext.Provider value={null}>
          <App />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("No Account?")).toBeInTheDocument();
  });
});
