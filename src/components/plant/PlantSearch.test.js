import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PlantSearch from "./PlantSearch";
import UserContext from "../auth/UserContext";

const user = {
  username: "testuser",
  first_name: "firstname",
  last_name: "lastname",
  email: "test@test.com",
};

const handleIsLoadingMock = jest.fn();

describe("PlantSearch component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <PlantSearch />
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <PlantSearch />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when logged out", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={null}>
          <PlantSearch
            isLoading={false}
            handleIsLoading={handleIsLoadingMock}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading message when loading", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <PlantSearch isLoading={true} handleIsLoading={handleIsLoadingMock} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders plants list", async function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <PlantSearch
            isLoading={false}
            handleIsLoading={handleIsLoadingMock}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(await screen.findByText("Test Plant 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Plant 2")).toBeInTheDocument();
  });
});
