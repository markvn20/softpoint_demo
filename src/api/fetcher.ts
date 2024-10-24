import { HTTPMethods } from "../types";
import { getToken } from "../utils";

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const BASE_URL = "https://sandbox-api.softpoint.io/interface/v1"; 

export const fetcher = (url: string, method?: HTTPMethods, additionalHeaders = {}) => {
    return fetch(`${BASE_URL}${url}`, {
        method: method ? method : "GET",
        headers: {
            'Content-Type': 'application/json',
            // Fetch token through localstorage or cookie.
            Authorization: `Bearer ${getToken()}`,
            // Authorization: `Bearer ${accessToken}`,
            ...additionalHeaders
        }
    }).then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
    .catch(err => {
        return err
    })
}