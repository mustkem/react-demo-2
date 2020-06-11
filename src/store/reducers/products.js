import { actionTypes } from "../action-types/action-types";

const initialState = {};

export default function index(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS: {
      return {
        ...state,
        products: {
          ...state.products,
          ...action.payload,
        },
      };
    }

    default:
      return { ...state };
  }
}
