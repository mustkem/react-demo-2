import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home component", () => {
  it("Should render link", () => {
    const wrapper = shallow(<Home />);
    const text = wrapper.find(".info").text();
    expect(text).toEqual("Romantic Comedy");
  });
});
