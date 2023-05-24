import { checkTokenExpired } from "../../Utils/tokenExpiredValidator";
import { BASE_URL } from "../../Utils/FetchRoutes";

export const getUsers = async () => {
    try {
        const res = await axios.get(`${BASE_URL}user`, {
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