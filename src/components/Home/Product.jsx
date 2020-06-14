import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import missingImage from "../../images/placeholder_for_missing_posters.png";

function Product({ item }) {
  const [imgSrc, setImgSrc] = useState("");
  const [askForImgFlag, setAskForImageFlag] = useState(true);
  const myRef = useRef(null);
  let imageLoadStatus = false;

  useEffect(() => {
    window.addEventListener("scroll", handleProductScroll);
    handleProductScroll();
    return () => {
      window.removeEventListener("scroll", handleProductScroll);
    };
  }, []);

  function lazyLoadImage() {
    try {
      const images = require.context("../../images", true);
      let img = images("./" + item["poster-image"]);
      setImgSrc(img);
    } catch {
      // console.log("image not available");
    }
  }

  function handleProductScroll() {
    if (imageLoadStatus) return false;

    var myElement = myRef.current;
    var bounding = myElement.getBoundingClientRect();

    if (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= window.innerWidth &&
      bounding.top <= window.innerHeight
    ) {
      setAskForImageFlag(false);
      lazyLoadImage();
      imageLoadStatus = true;
      // console.log("Element is in the viewport!");
    } else {
      // console.log("Element is NOT in the viewport!");
    }
  }

  return (
    <li>
      <Link to="">
        {imgSrc && <img className="missing-img" src={imgSrc} alt="product" />}
        {!imgSrc && (
          <img
            ref={myRef}
            className="missing-img"
            src={missingImage}
            alt="product"
          />
        )}
        <span>{item.name}</span>
      </Link>
    </li>
  );
}

export default Product;
