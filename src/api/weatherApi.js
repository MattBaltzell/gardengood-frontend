import axios from "axios";
const BASE_URL = "http://api.weatherapi.com/v1";

const API_KEY =
  process.env.WEATHER_APP_API_KEY || "3a7b7ff9752a4f73966181105230302";

class WeatherApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {};

    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCurrentWeather(zip) {
    try {
      const res = await this.request(
        `current.json?key=${API_KEY}&q=${zip}&aqi=no`
      );
      console.log(res.current);
      return res.current;
    } catch (err) {
      console.error("WeatherAPI Error:", err.response);
    }
  }
}

export default WeatherApi;
