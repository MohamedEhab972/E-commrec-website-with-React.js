import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setcategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getCategorys() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setcategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategorys();
  }, []);
  return (
    <>
    <h2 className="my-2 font-semibold text-lg">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id}>
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt=""
            />
            <h3 className="text-center">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
