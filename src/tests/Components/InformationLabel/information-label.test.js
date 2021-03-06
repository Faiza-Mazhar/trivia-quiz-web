import InformationLabel from "../../../Components/InformationLabel/information-label";
import renderer from "react-test-renderer";

test("Information label renders correct props", () => {
  const component = renderer.create(
    <InformationLabel information={"This is my information"} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
