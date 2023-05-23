import axios from "axios";
import { checkTokenExpired } from "../../Utils/tokenExpiredValidator";

import { BASE_URL } from "../../Utils/FetchRoutes";

export const search = async (query, uid) => {
  try {
    const res = await axios.get(`${BASE_URL}/${query}/${uid}`, {
      headers: {
        "x-token": window.localStorage.getItem("token")
      }
    });
    return res.data;
  } catch (error) {
    checkTokenExpired(error.response.data)
    return error.response.data;
  }
};