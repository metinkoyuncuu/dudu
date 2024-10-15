import axios from "axios"
import { API_URL } from "../environments/environment"

export const get = async (req)=>{
    const response = await axios.get(API_URL + req);
    return response;
}