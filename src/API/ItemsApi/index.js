import axios from "axios";
import {
    checkTokenExpired
} from "../../Utils/tokenExpiredValidator";

import {
    BASE_URL
} from "../../Utils/FetchRoutes";
const BASE_URL_ITEM = BASE_URL + "/item"

export const uploadItemsAPI = async (filesFormData, userId) => {
    try {
        const res = await axios.post(
            `${BASE_URL_ITEM}/uploadItems/${userId}`,
            filesFormData, {
                headers: {
                    "x-token": window.localStorage.getItem("token")
                }
            });
        return res.data;
    } catch (error) {
        if (error?.message) {
            return error.message
        }
        checkTokenExpired(error.response.data)
        return error.response.data;
    }
};

export const uploadItemUrlAPI = async (urlData, userId) => {
    try {
        const res = await axios.post(
            `${BASE_URL_ITEM}/uploaditemurl/${userId}`,
            urlData, {
                headers: {
                    "x-token": window.localStorage.getItem("token")
                }
            });
        return res.data;
    } catch (error) {
        if (error?.message) {
            return error.message
        }
        checkTokenExpired(error.response.data)
        return error.response.data;
    }
};

export const getItems = async () => {
    try {
        const res = await axios.get(`${BASE_URL_ITEM}/getitems`, {
        });
        return res.data;
    } catch (error) {
        if (error?.message) {
            return error.message
        }
        return error.response.data;
    }
};