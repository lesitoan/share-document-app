import axios from 'axios';
import { getCookieValue, setCookie } from './cookie';

const getNewAccessToken = async () => {
    try {
        const refreshToken = getCookieValue("refreshToken");
        const url = `${window.location.origin}/api/v1/users/refresh-token`;
        const response = await axios({
            url,
            method: "POST",
            data: { refreshToken },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.data?.data?.newAccessToken) {
            return response.data.data.newAccessToken;
        }
    } catch (err) {
        console.log("err refreshtoken: ", err);
        return "";
    }

}

let isTokenExpired = false;
const GetData = async (url, options) => {
    try {
        const response = await axios({
            url,
            ...options
        })
        return response;
    } catch (err) {
        console.log("err GetData: ", err);

        //get refresh token
        if (err.response.status === 401) {
            isTokenExpired = true;
            return;
        };
        return err;
    }

}

export const callApi = async (url, options) => {
    try {
        let response = "";
        response = await GetData(url, options);
        //get new accesstoken
        if (isTokenExpired) {
            console.log('TokenExpired')
            const newAccessToken = await getNewAccessToken();
            if (newAccessToken) {
                console.log("callApi new accesstoken: ", newAccessToken);
                setCookie('accessToken', newAccessToken);

                // send api again
                response = await GetData(url, options);
                isTokenExpired = false;
            } else {
                console.log('abc')
                setCookie('accessToken', "");
                setCookie('refreshToken', "");
                setCookie('name', "");
                alert("Please login and try again !!!")
                window.location.href = `${window.location.origin}/sign-in`;
            }
        }
        console.log("response2: ", response);
        return response;
    } catch (err) {
        console.log("callApi err: ", err);
        return err;
    }

}

