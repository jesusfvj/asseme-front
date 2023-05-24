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
            `${BASE_URL_ITEM}/uploaditems/${userId}`,
            filesFormData, {
                headers: {
                    "x-token": window.localStorage.getItem("token")
                }
            });
        return res.data;
    } catch (error) {
        if(error?.response?.data){
            checkTokenExpired(error.response.data)
            return error.response.data
        }
        return error
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
        if(error?.response?.data){
            checkTokenExpired(error.response.data)
            return error.response.data
        }
        return error
    }
};

export const getTopItems = async () => {
    try {
        const res = await axios.get(`${BASE_URL_ITEM}/gettopitems`, {
        });
        return res.data;
    } catch (error) {
        if(error?.response?.data){
            return error.response.data
        }
        return error
    }
};

export const getItems = async () => {
    try {
        const res = await axios.get(`${BASE_URL_ITEM}/getitems`, {
        });
        return res.data;
    } catch (error) {
        if(error?.response?.data){
            return error.response.data
        }
        return error
    }
};

export const deleteItem = async (itemId, userId) => {
    try {
        const res = await axios.post(`${BASE_URL_ITEM}/deleteitem/${itemId}`,
        {userId}, {
            headers: {
                "x-token": window.localStorage.getItem("token")
            }
        });
        return res.data;
    } catch (error) {
        if(error?.response?.data){
            checkTokenExpired(error.response.data)
            return error.response.data
        }
        return error
    }
};

export const editItem = async (itemId, userId, itemNewName) => {
    try {
        const res = await axios.put(`${BASE_URL_ITEM}/edititem/${itemId}`,
        {userId, itemNewName}, {
            headers: {
                "x-token": window.localStorage.getItem("token")
            }
        });
        return res.data;
    } catch (error) {
        if(error?.response?.data){
            checkTokenExpired(error.response.data)
            return error.response.data
        }
        return error
    }
};