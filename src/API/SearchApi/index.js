import axios from "axios";
import { checkTokenExpired } from "../../Utils/tokenExpiredValidator";
import { BASE_URL } from "../../Utils/FetchRoutes";
const BASE_URL_SEARCH = BASE_URL + "/search"

export const search = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL_SEARCH}/${query}`,);
    return response.data;
  } catch (error) {
    if(error?.response?.data){
        return error.response.data
    }
    return error
}
};

export const searchById = async (query, userId) => {
  try {
    const response = await axios.get(`${BASE_URL_SEARCH}/searchbyid/${query}/${userId}`, {
      headers: {
        "x-token": window.localStorage.getItem("token")
      }
    });
    return response.data;
  } catch (error) {
    if(error?.response?.data){
        checkTokenExpired(error.response.data)
        return error.response.data
    }
    return error
}
};