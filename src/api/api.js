import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class GardenGoodApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GardenGoodApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //////////////////////////////////////////////////////
  // USER ROUTES

  /**
   * Get details on a user by username.
   * */

  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Update a user by username.
   * - data can include: username, password firstName, lastName, email, zipCode
   * */

  static async updateUser({ username, ...data }) {
    const res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }

  //////////////////////////////////////////////////////
  // AUTH ROUTES

  /**
   * Log a user in
   * - data includes: username, password
   * */

  static async login(data) {
    const res = await this.request("auth/token", data, "POST");
    return res.token;
  }

  /**
   * Sign a user up
   * - data includes: username, password, firstName, lastName, email, zipCode
   * */

  static async signup(data) {
    const res = await this.request("auth/register", data, "POST");
    return res.token;
  }

  //////////////////////////////////////////////////////
  // PLANTS ROUTES

  /**
   * Get a list of all plants (optional filter term).
   * */

  static async getAllPlants(filterTerm) {
    let res = !filterTerm
      ? await this.request("plants/")
      : await this.request(`plants?name=${filterTerm}`);
    return res.plants;
  }

  static async getPlant(id) {
    const res = await this.request(`plants/${id}`);
    return res.plant;
  }
}

// Temporary admin token for development
// GardenGoodApi.token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzc2NDA3Mzl9.HoNDrjYXseNCN6CIKkCB9FqT6ecJumAVNE6OeTg1WLk`;

export default GardenGoodApi;
