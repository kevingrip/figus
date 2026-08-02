import axios from "axios";
import { obtenerToken } from "./obtenerToken.js";

export const mlGet = async (url, config = {}) => {

    const token = await obtenerToken();

    return axios.get(url, {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"                
        }
    });

}

export const mlPost = async (url, body = {}) => {

    const token = await obtenerToken();

    return axios.post(url, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}

export const mlPut = async (url, body = {}) => {

    const token = await obtenerToken();

    return axios.put(url, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}

export const mlDelete = async (url) => {

    const token = await obtenerToken();

    return axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}