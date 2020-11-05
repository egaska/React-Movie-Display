import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Counter from "./Counter";


afterEach(cleanup);

test("<Counter />", () => {
  const { debug, getByTestId } = render(<Counter />);

  //Outputs the DOM as a string
  debug();
  const counterButton = getByTestId('counter-button');

  //Asserts counter-button is a button
  expect(counterButton.tagName).toBe("BUTTON");

  //Asserts that counter-button starts at 0
  expect(counterButton.textContent).toBe("0");

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('1');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('2');

});
