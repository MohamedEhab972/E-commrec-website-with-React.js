import React from "react";
import Slider from "react-slick";
import image1 from "../../assets/210218-product-of-the-year-2x1-cs.jpg";
import image2 from "../../assets/Cosmetic-Manufacturers-In-Panchkula.jpg";
import image3 from "../../assets/google-home-products-1669059055.jpg";
import image4 from "../../assets/old-school-beauty-products-640-1648035587.jpg";
import image5 from "../../assets/product-hunting-1024x576.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img
              src={image1}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={image4}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={image5}
              className="w-full h-[400px] object-cover"
              alt=""
            />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={image2} className="w-full h-[200px]" alt="" />
          <img src={image3} className="w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
}
