import { connect } from "react-redux";
import { path } from "ramda";

import Home from "../components/Home/Home";

import { getProducts } from "../store/actions";

const mapStateToProps = (state) => {
  return {
    products: path(
      ["products", "products", "page", "content-items", "content"],
      state
    ),
    title: path(["products", "products", "page", "title"], state),
    pageNumRequested: path(
      ["products", "products", "page", "page-num-requested"],
      state
    ),
    loading: path(["products", "products", "loading"], state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (index) => dispatch(getProducts(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
