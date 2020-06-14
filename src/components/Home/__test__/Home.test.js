import React from "react";
import { shallow, mount } from "enzyme";
import Home from "../Home";
import { getProducts } from "../../../store/actions";

const props = {
  getProducts,
};

// snapsot testing //
it("Should render home page correctly", () => {
  const wrapper = shallow(<Home {...props} />);
  expect(wrapper).toMatchSnapshot();
});

// mock calling of api
it("Should calls call componentDidMount and thereafter call action.", () => {
  jest.spyOn(Home.prototype, "componentDidMount");
  const wrapper = shallow(<Home {...props} />);
  expect(Home.prototype.componentDidMount.mock.calls.length).toBe(1);
});

// Check if component accept props.
it("Should accept action props", () => {
  const wrapper = shallow(<Home {...props} />);
  expect(wrapper.instance().props.getProducts).toEqual(getProducts);
});
