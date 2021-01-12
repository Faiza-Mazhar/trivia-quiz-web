import CustomButton from "../../Components/CustomButton/custom-button";

import { render, cleanup, screen } from "@testing-library/react";

afterEach(cleanup);

test("custom button is rendered with the test defined as children", () => {
  const buttonText = "Click Me";
  const { getByText } = render(<CustomButton>{buttonText}</CustomButton>);

  expect(getByText(/Click Me/i).textContent).toBe(buttonText);
});
