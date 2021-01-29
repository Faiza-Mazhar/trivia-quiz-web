import renderer from "react-test-renderer";

import SignIn from "../../../Containers/SignIn/sign-in";

test("Sign form renders with correct props", () => {
  const component = renderer.create(<SignIn />).toJSON();
  expect(component).toMatchSnapshot();
});
