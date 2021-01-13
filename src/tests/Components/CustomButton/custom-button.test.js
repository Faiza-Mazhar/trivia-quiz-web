import CustomButton from "../../../Components/CustomButton/custom-button";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

test("custom button is rendered with the test defined as children", () => {
  const buttonText = "Click Me";
  const { getByText } = render(<CustomButton>{buttonText}</CustomButton>);

  expect(getByText(/Click Me/i).textContent).toBe(buttonText);
});

test("Button rendered", () => {
  const component = renderer.create(<CustomButton>Click Me</CustomButton>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Button class changes the class it is isGoogleSignedIn", () => {
  const component = renderer.create(
    <CustomButton isGoogleSignedIn>Click Me</CustomButton>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("CustomButton rendered the google icon", () => {
  const component = renderer.create(
    <CustomButton isGoogleSignedIn>
      <img alt="google" />
      Click Me
    </CustomButton>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
