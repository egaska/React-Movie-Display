import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import MovieDetail from "../MovieDetail";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  //Resets the mock for each test
  console.error.mockClear();
});

const match = {
  params: {
    id: "TestId",
  },
};

console.error = jest.fn();

const movie = {
  id: "01",
  title: "Groundhogs Day",
};

//Tests if the code is fetching the data from the API correctly.
test("<MovieDetail />", async () => {
  fetch.mockResponse(JSON.stringify(movie));

  const { getByTestId } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByTestId("movie-title"));

  expect(getByTestId("movie-title").textContent).toBe(movie.title);
});
