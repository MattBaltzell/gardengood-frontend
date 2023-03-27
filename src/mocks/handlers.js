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

  // Handles a GET /plants request

  rest.get(`${BASE_URL}/plants`, (req, res, ctx) => {
    return res(
      ctx.json({
        plants: [
          {
            id: 1,
            name: "Test Plant 1",
            species: "Test Plant 1 Species",
            imgUrl: "testplant1img",
            isPerrenial: true,
            description: "Description 1",
            daysToMaturityMin: 1095,
            daysToMaturityMax: 1460,
            sunlight: ["Full Sun", "Partial Sun"],
            growingSeasons: ["Spring"],
          },
          {
            id: 2,
            name: "Test Plant 2",
            species: "Test Plant 2 Species",
            imgUrl: "testplant1img",
            isPerrenial: false,
            description: "Description 2",
            daysToMaturityMin: 90,
            daysToMaturityMax: 120,
            sunlight: ["Full Sun"],
            growingSeasons: ["Spring"],
          },
        ],
      })
    );
  }),

  // Handles a GET /plants/:id request

  rest.get(`${BASE_URL}/plants/:id`, (req, res, ctx) => {
    return res(
      ctx.json({
        plant: {
          id: req.params.id,
          name: "Test Plant 1",
          species: "Test Plant 1 Species",
          imgUrl: "testplant1img",
          isPerrenial: true,
          description: "Description 1",
          daysToMaturityMin: 1095,
          daysToMaturityMax: 1460,
          sunlight: ["Full Sun", "Partial Sun"],
          growingSeasons: ["Spring"],
          instructions: {
            planting: "Planting instructions 1",
            pruning: "Pruning instructions 1",
            watering: "Watering instructions 1",
          },
        },
      })
    );
  }),
];
