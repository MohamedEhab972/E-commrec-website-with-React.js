import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addToCart, setcartItems } = useContext(CartContext);
  const [spinner, setspinner] = useState(false);
  const [IdProduct, setIdProduct] = useState("");

  async function wayAddToCart(id) {
    setIdProduct(id);
    setspinner(true);
    let res = await addToCart(id);
    let sum = 0;
    for (const el of res.data.data.products.map((product) => product.count)) {
      sum += el;
    }
    if (res.data.status == "success") {
      setcartItems(sum);
      setspinner(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  let { id, cat } = useParams();
  const [products, setproducts] = useState(null);
  const [productes, setproductes] = useState([]);

  function getProductDetails(params) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${params}`)
      .then((res) => {
        setproducts(res.data.data);
        console.log(res.data.data);
      })
      .catch((res) => {
        setproducts(res.data.data);
      });
  }

  function getProductes() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        let x = res.data.data.filter((pro) => pro.category.name == cat);
        setproductes(x);
      })
      .catch((res) => {
        console.log(res.data.data);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getProductes();
  }, [id, cat]);

  return (
    <>
      <div className="pt-24">
        <div className="row py-8">
          <div className="w-full md:w-1/4">
            <div className="iteam">
              <Slider {...settings}>
                {products?.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} className="object-cover" alt="" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full md:w-3/4 p-4">
            <h1 className="font-bold text-2xl">{products?.title}</h1>
            <h3 className="my-3 text-slate-500">{products?.description}</h3>
            <h3 className="text-green-500">{products?.category.name}</h3>
            <div className="flex justify-between p-2 my-2">
              <span>{products?.price} EGP</span>
              <span>
                <i className="fas fa-star text-sm text-yellow-300"></i>{" "}
                {products?.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => {
                wayAddToCart(id);
              }}
              type="button"
              className="text-white w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {spinner && IdProduct == id ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold">Related Products</h1>
        <div className="row justify-center  pt-5">
          {productes.length > 0 ? (
            productes.map((product) => (
              <div
                key={product.id}
                className="col w-6/6 sm:w-1/4 md:w-1/6 my-3 p-5"
              >
                <div className="iteam">
                  <Link
                    to={`/productdetailes/${product.id}/${product.category.name}`}
                  >
                    <img src={product.imageCover} className="w-full" alt="" />
                    <h3 className="mt-3 font-semibold text-green-500">
                      {product.category.name}
                    </h3>
                    <h3 className="font-medium">
                      {product.title.split(" ").slice(0, 2).join("  ")}
                    </h3>
                    <div className="flex justify-between p-2">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star text-sm text-yellow-300"></i>{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      wayAddToCart(product.id);
                    }}
                    type="button"
                    className="text-white w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    {spinner && IdProduct == product.id ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="min-h-screen flex justify-center items-center">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
