import { path } from "ramda";

import httpInstance from "../../helpers/http-client";
import { actionTypes } from "../action-types/action-types";

export const onGetProducts = (data) => {
  return {
    type: actionTypes.GET_PRODUCTS,
    payload: data,
  };
};

export const getProducts = (page) => (dispatch, getState) => {
  return new Promise((res, rej) => {
    // dispatch(onGetProducts({ loading: true }));
    console.log("testtttt");
    httpInstance({
      method: "get",
      url: "/CONTENTLISTINGPAGE-PAGE" + page + ".json",
      responseType: "json", // default
    })
      .then(function (response) {
        const oldContent = path(
          ["products", "products", "page", "content-items", "content"],
          getState()
        );

        if (oldContent) {
          const responseData = response.data;
          responseData.page["content-items"].content = [
            ...oldContent,
            ...responseData.page["content-items"].content,
          ];
          dispatch(onGetProducts({ ...responseData, loading: false }));
        } else {
          dispatch(onGetProducts({ ...response.data, loading: false }));
        }
        res(response);
      })
      .catch(function (error) {
        console.log(error);
        rej();
      });
  });
};
