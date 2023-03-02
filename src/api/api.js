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
}

// Temporary admin token for development
GardenGoodApi.token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzc2NDA3Mzl9.HoNDrjYXseNCN6CIKkCB9FqT6ecJumAVNE6OeTg1WLk`;

export default GardenGoodApi;
