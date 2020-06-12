import { actionTypes } from "../action-types/action-types";
import { path } from "ramda";

const initialState = {};

export default function index(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS: {
      const oldContent = path(
        ["products", "page", "content-items", "content"],
        state
      );
      const responseData = action.payload;

      if (
        oldContent &&
        path(["page", "content-items", "content"], responseData)
      ) {
        responseData.page["content-items"].content = [
          ...oldContent,
          ...responseData.page["content-items"].content,
        ];
      }
      return {
        ...state,
        products: {
          ...state.products,
          ...responseData,
        },
      };
    }

    default:
      return { ...state };
  }
}
