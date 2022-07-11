import axios from "axios";
import { localUserStorageService } from "./localService";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const TOKEN_CYBERSOFT = process.env.REACT_APP_CYBERSOFT_TOKEN;

let timeRequestMax;

const getAccessToken = () => {
    let userLogin = localUserStorageService.getUserLocal();
    if (userLogin) {
        return userLogin.accessToken;
    } else {
        return null;
    };
};

export const getRequestConfig = () => {
    const config = {
        headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
        },
    };
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}

export const httpSerivce = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * timeRequestMax,
    ...getRequestConfig(),
});

//Action can thiệp trước khi gọi request API
httpSerivce.interceptors.request.use(
    function (config) {

        return config;
    },
    function (error) {
        console.log("error request interceptor: ", error);
        return Promise.reject(error);
    },
);

//Action can thiệp sau khi có request API trả về
httpSerivce.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log("error response interceptor: ", error);
        return Promise.reject(error);
    },
);