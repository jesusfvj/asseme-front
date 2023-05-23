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
            `${BASE_URL_ITEM}/uploadNewSongs/${userId}`,
            filesFormData, {
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

export const uploadItemUrlAPI = async (filesFormData, userId) => {
    try {
        const res = await axios.post(
            `${BASE_URL_ITEM}/uploadNewSongs/${userId}`,
            filesFormData, {
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