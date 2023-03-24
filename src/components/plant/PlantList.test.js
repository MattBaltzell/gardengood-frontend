import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PlantList from "./PlantList";
import UserContext from "../auth/UserContext";

const user = {
  username: "testuser",
  first_name: "firstname",
  last_name: "lastname",
  email: "test@test.com",
};

const plants = [
  { id: 1, name: "Plant 1", imgUrl: "http://img1url.jpg" },
  { id: 2, name: "Plant 2", imgUrl: "http://img2url.jpg" },
];

describe("PlantList component tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <PlantList plants={plants} />
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <PlantList plants={plants} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders list of plants", function () {
    render(
      <MemoryRouter>
        <UserContext.Provider value={user}>
          <PlantList plants={plants} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Plant 1")).toBeInTheDocument();
    expect(screen.getByAltText("Plant 2")).toBeInTheDocument();
  });
});
