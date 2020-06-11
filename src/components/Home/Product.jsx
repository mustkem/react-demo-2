import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

import missingImage from "../../images/placeholder_for_missing_posters.png";

function Product({ item }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    try {
      const images = require.context("../../images", true);
      let img = images("./" + item["poster-image"]);
      setImgSrc(img);
    } catch {
      console.log("test");
    }
  }, []);
  return (
    <li>
      <Link to="">
        {imgSrc && <img src={imgSrc} alt="product" />}
        {!imgSrc && (
          <img className="missing-img" src={missingImage} alt="product" />
        )}
        <span>{item.name}</span>
      </Link>
    </li>
  );
}

export default Product;
