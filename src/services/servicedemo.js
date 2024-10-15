import axios from "axios"
import { API_URL } from "../environments/environment"

class Service {
    async get(req) {
      try {
        const response = await axios.get(API_URL + req);
        return response.data; // response.data'yı dönmek genellikle tercih edilir
      } catch (error) {
        console.error("Error in Service get method:", error);
        throw error;
      }
    }
  }

export default new Service();