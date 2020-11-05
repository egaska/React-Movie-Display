import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import MovieList from "./MoviesList";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  //Resets the mock for each test
  console.error.mockClear();
});

console.error = jest.fn();

const movie = {
  results: [
    {
      id: "01",
      title: "Groundhogs Day",
      poster_path: "poster.jpg",
    },
  ],
};

//Tests if the code is fetching the data from the API correctly.
test("<MovieList />", async () => {
  fetch.mockResponse(JSON.stringify(movie));

  const { getByTestId, queryByTestId, debug } = render(
    <MemoryRouter>
      <MovieList />
    </MemoryRouter>
  );
  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId("movie-link"));
  expect(queryByTestId('loading')).toBeFalsy();

  debug();


});
