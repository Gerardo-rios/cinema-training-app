import { get_movie_by_id } from "../javascript/get-movie";
import { API_MOVIE_ID_URL, OPTIONS } from "../javascript/constants";
import { jest } from "@jest/globals";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

const API_URL = API_MOVIE_ID_URL.replace("{id}", "tt0111161");

describe("GET_MOVIE_BY_ID Function Tests", () => {
    it("Should return a movie when the API call is successfully done", async () => {
        const mockedResponse = {
            "results": {
                "id": "tt0111161",
                "ratingsSummary": {},
                "episodes": null,
                "primaryImage": {},
                "titleType": {},
                "genres": {},
                "titleText": {},
                "originalTitleText": {},
                "releaseYear": {},
                "releaseDate": {},
                "runtime": {},
                "series": null,
                "meterRanking": {},
                "plot": {},
            }
        };

        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                text: () => Promise.resolve(JSON.stringify(mockedResponse)),
            })
        );
        
        const response = await get_movie_by_id("tt0111161");
        
        expect(fetch).toHaveBeenCalledWith(API_URL, OPTIONS);
        expect(response).toEqual(mockedResponse.results);
    });
    
    it("Should not respond when the API doesn't respond", async () => {
        const expectedErrorMessage = "The API is unreachable, please contact the API provider";
    
        fetch.mockImplementationOnce(() =>
        Promise.reject(
            new Error(expectedErrorMessage)
        )
        );
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const response = await get_movie_by_id("tt0111161");
    
        expect(fetch).toHaveBeenCalledWith(API_URL, OPTIONS);
        expect(response).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(new Error(expectedErrorMessage));
        consoleSpy.mockRestore();
    });
});