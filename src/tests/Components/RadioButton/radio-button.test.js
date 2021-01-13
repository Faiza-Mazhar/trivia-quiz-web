import RadioButton from "../../../Components/RadioButton/radio-button";

import renderer from "react-test-renderer";

test("Radio buttons, if no props are set", () => {
  const component = renderer.create(<RadioButton />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Radio buttons, if with props", () => {
  const component = renderer.create(
    <RadioButton
      value={"value"}
      inputProps={{
        name: "name",
        type: "radio",
        onClick: jest.fn,
      }}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
