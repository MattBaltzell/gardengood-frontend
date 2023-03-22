import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Plant from "./Plant";
import UserContext from "../auth/UserContext";

const user = {
  username: "testuser",
  first_name: "firstname",
  last_name: "lastname",
  email: "test@test.com",
};

describe("Plant component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <Plant />
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <Plant />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when logged out", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={null}>
          <Plant />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
