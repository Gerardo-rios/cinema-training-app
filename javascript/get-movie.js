import { OPTIONS, API_MOVIE_ID_URL } from "./constants.js";

export const get_movie_by_id = async(movieId) => {
    const API_URL = API_MOVIE_ID_URL.replace("{id}", movieId);
    try {
        const response = await fetch(API_URL, OPTIONS);
        const result = await response.text();
        return JSON.parse(result).results;
    } catch (error) {
        console.error(error);
    }
};