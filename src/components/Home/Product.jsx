import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import missingImage from "../../images/placeholder_for_missing_posters.png";

function Product({ item }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    try {
      const images = require.context("../../images", true);
      let img = images("./" + item["poster-image"]);
      setImgSrc(img);
    } catch {
      console.log("image not available");
    }
  }, []);

  return (
    <li>
      <Link to="">
        {imgSrc && (
          <LazyLoadImage
            alt={item.name}
            src={imgSrc} // use normal <img> attributes as props
          />
        )}
        {!imgSrc && (
          <img className="missing-img" src={missingImage} alt="product" />
        )}
        <span>{item.name}</span>
      </Link>
    </li>
  );
}

export default Product;
