import { rest } from "msw";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export const handlers = [
  // Handles a GET /user request
  rest.get(`${BASE_URL}/users/:username`, (req, res, ctx) => {
    const { username } = req.params;
    return res(
      ctx.json({
        user: {
          username: username,
          email: "testuser@testuser.com",
          firstName: "Test",
          lastName: "User",
          zipCode: "36830",
          joinAt: "2023-03-03 18:24:48.215773",
          isAdmin: false,
        },
      })
    );
  }),
  rest.patch(`${BASE_URL}/users/:username`, null),
  rest.post(`${BASE_URL}/auth/token`, null),
  rest.post(`${BASE_URL}/auth/register`, null),
  rest.get(`${BASE_URL}/plants`, null),
  rest.get(`${BASE_URL}/plants/:id`, null),
];
