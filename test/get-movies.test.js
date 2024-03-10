import { get_movies } from "../javascript/get-movies";
import { API_URL, OPTIONS } from "../javascript/constants";
import { jest } from "@jest/globals";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe("get_movies", () => {
  it("Should return the movies when the API call is successfully done", async () => {
    const mockedResponse = {
      results: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ],
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify(mockedResponse)),
      })
    );

    const movies = await get_movies();

    expect(fetch).toHaveBeenCalledWith(API_URL, OPTIONS);
    expect(movies).toEqual(mockedResponse.results);
  });

  it("Should not respond when the API doesn't respond", async () => {
    const expectedErrorMessage = "The API is unreachable, please contact the API provider";

    fetch.mockImplementationOnce(() =>
      Promise.reject(
        new Error(expectedErrorMessage)
      )
    );
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const response = await get_movies();

    expect(fetch).toHaveBeenCalledWith(API_URL, OPTIONS);
    expect(response).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(new Error(expectedErrorMessage));
    consoleSpy.mockRestore();
  });
});
