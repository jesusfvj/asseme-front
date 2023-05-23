import axios from "axios";
import { checkTokenExpired } from "../../Utils/tokenExpiredValidator";

import { BASE_URL } from "../../Utils/FetchRoutes";
const BASE_URL_USER = BASE_URL + "/user"

export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL_USER}/register`, user);
    return res.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL_USER}/login`, user);
    return res.data;
  } catch (error) {
    console.log(error)
    return error.response.data.msg;
  }
};

export const getUserById = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL_USER}/${userId}`, {
      headers: {
        "x-token": window.localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    checkTokenExpired(error.response.data);
    return error.response.data;
  }
};

export const updateProfileImageAPI = async (formData, userId) => {
  try {
    const res = await axios.put(
      `${BASE_URL_USER}/uploadProfileImage/${userId}`,
      formData,
      {
        headers: {
          "x-token": window.localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  } catch (error) {
    checkTokenExpired(error.response.data);
    return error.response.data;
  }
};

/* export const sendEmail = async (email) => {
  try {
    const res = await axios.post(
      `${BASE_URL_USER}/resetpassword`,
      {
        email,
      },
      {
        headers: {
          "x-token": window.localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  } catch (error) {
    checkTokenExpired(error.response.data);
    return error.response.data;
  }
}; */

