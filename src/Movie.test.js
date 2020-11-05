import React from "react";
import { render, cleanup } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import Movie, { POSTER_PATH } from "./Movie";

afterEach(() => {
  cleanup();
  //Resets the mock for each test
  console.error.mockClear();
});

console.error = jest.fn();

//Tests if no movie is found and throws an error
test("<Movie />", () => {
  render(<Movie />);
  expect(console.error).toBeCalled();
});

const movie = {
  id: "01",
  title: "Groundhog Day",
  poster_path: "movieposter.jpg",
};

//Tests that the error is not called if a movie is found
test("<Movie /> with movie", () => {
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>
  );
  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId('movie-link').getAttribute('href')).toBe('/' + movie.id);
  expect(getByTestId('movie-img').src).toBe(`${POSTER_PATH}${movie.poster_path}`);
  debug();
});
