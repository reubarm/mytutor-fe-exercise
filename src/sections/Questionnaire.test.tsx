import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Questionnaire from "./Questionnaire";

test("renders the questionnaire and submits an answer", () => {
  render(<Questionnaire />);

  // Ensure the component is rendered correctly
  const headerElement = screen.getByText(/Onboarding Questionnaire/i);
  expect(headerElement).toBeInTheDocument();

  // Click on the div containing the "Online tutoring" text to simulate the checkbox being checked
  const checkboxDiv = screen.getByText(/Online tutoring/i);
  fireEvent.click(checkboxDiv);
  const checkbox = screen.getByLabelText("Online tutoring");
  expect(checkbox).toBeChecked();

  // Click on the div containing the "0-1 years" text to simulate the radio button being checked
  const radioDiv = screen.getByText(/0-1 years/i);
  fireEvent.click(radioDiv);
  const radio = screen.getByLabelText("0-1 years");
  expect(radio).toBeChecked();

  // Mocking fetch before clicking Submit
  const mockFetchResponse = {
    json: jest.fn().mockResolvedValue({ message: "Success" }),
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    type: "default",
    url: "",
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  };

  (global.fetch as jest.Mock) = jest.fn().mockResolvedValue(mockFetchResponse);

  // Click on the Submit button
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  expect(fetch).toHaveBeenCalledTimes(1);
});
