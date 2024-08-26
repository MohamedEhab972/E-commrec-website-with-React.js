import { CartContext } from "./../../Context/CartContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function WishList() {
  let {
    loginUserWishList,
    removeProductFromWishlist,
    setfavProducts1,
    addToCart,
    setIdProduct1,
    setcartItems,
  } = useContext(CartContext);

  const [productsList, setproductsList] = useState([]);
  const [spinner, setspinner] = useState(false);
  const [IdProduct, setIdProduct] = useState("");

  async function wayloginUserWishList() {
    let res = await loginUserWishList();
    console.log(res);
    if (res?.data?.status == "success") {
      setfavProducts1(res.data.count);
      setproductsList(res.data.data);
    } else {
      toast(res.data.message);
    }
  }

  async function wayremoveProductFromWishlist(id) {
    let res = await removeProductFromWishlist(id);
    console.log(res);
    if (res.data.status == "success") {
      setIdProduct1(res.data.data);
      localStorage.setItem("favproducts", JSON.stringify(res.data.data));
      setfavProducts1(res.data.data.length);
      wayloginUserWishList();
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  }

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
      toast(res.data.message);
    }
  }

  useEffect(() => {
    wayloginUserWishList();
  }, []);

  return (
    <>
      {productsList.length > 0 ? (
        <section className="my-20 py-20">
          <div className="row justify-evenly gap-3">
            {productsList.map((product) => (
              <div
                key={product.id}
                className="flex lg:w-[48%] w-full  flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={product.imageCover}
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {product?.title?.split(" ").slice(0, 3).join("  ")}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {product?.description?.split(" ").slice(0, 12).join("  ")}
                  </p>
                  <button
                    onClick={() => {
                      wayAddToCart(product.id);
                    }}
                    type="button"
                    className="text-white w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    {spinner && IdProduct == product.id ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      <span>
                        <i className="fa-solid fa-cart-shopping"></i> Add to
                        Cart
                      </span>
                    )}
                  </button>
                  <div
                    onClick={() => {
                      wayremoveProductFromWishlist(product.id);
                    }}
                    href="#"
                    className="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <i className="me-2 fa-solid fa-trash"></i> Remove
                  </div>
                </div>
              </div>
              // <div
              //   key={product.id}
              //   className="lg:w-1/7 md:1/6 mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              // >
              //   <img
              //     className="p-8 rounded-t-lg w-[300px] h-[300px] mx-auto"
              //     src={product.imageCover}
              //     alt="product image"
              //   />
              //   <div className="px-5 pb-5">
              //     <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              //       {product.title.split(" ").slice(0, 2).join("  ")}
              //     </h5>
              //     <div className="flex items-center mt-2.5 mb-5">
              //       <div className="flex items-center space-x-1 rtl:space-x-reverse">
              //         <svg
              //           className="w-4 h-4 text-yellow-300"
              //           aria-hidden="true"
              //           xmlns="http://www.w3.org/2000/svg"
              //           fill="currentColor"
              //           viewBox="0 0 22 20"
              //         >
              //           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //         </svg>
              //         <svg
              //           className="w-4 h-4 text-yellow-300"
              //           aria-hidden="true"
              //           xmlns="http://www.w3.org/2000/svg"
              //           fill="currentColor"
              //           viewBox="0 0 22 20"
              //         >
              //           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //         </svg>
              //         <svg
              //           className="w-4 h-4 text-yellow-300"
              //           aria-hidden="true"
              //           xmlns="http://www.w3.org/2000/svg"
              //           fill="currentColor"
              //           viewBox="0 0 22 20"
              //         >
              //           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //         </svg>
              //         <svg
              //           className="w-4 h-4 text-yellow-300"
              //           aria-hidden="true"
              //           xmlns="http://www.w3.org/2000/svg"
              //           fill="currentColor"
              //           viewBox="0 0 22 20"
              //         >
              //           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //         </svg>
              //         <svg
              //           className="w-4 h-4 text-gray-200 dark:text-gray-600"
              //           aria-hidden="true"
              //           xmlns="http://www.w3.org/2000/svg"
              //           fill="currentColor"
              //           viewBox="0 0 22 20"
              //         >
              //           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //         </svg>
              //       </div>
              //       <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              //         {product.ratingsAverage}
              //       </span>
              //     </div>
              //     <div className="flex items-center justify-between">
              //       <span className="text-2xl font-bold text-gray-900 dark:text-white">
              //         {product.price} EGP
              //       </span>
              //       <a
              //         href="#"
              //         className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              //       >
              //         Remove
              //       </a>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="min-h-screen flex justify-center items-center ">
          <div className="preloader">
            <svg
              className="cart"
              role="img"
              aria-label="Shopping cart line animation"
              viewBox="0 0 128 128"
              width="128px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={8}
              >
                <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                  <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                  <circle cx={43} cy={111} r={13} />
                  <circle cx={102} cy={111} r={13} />
                </g>
                <g className="cart__lines" stroke="currentColor">
                  <polyline
                    className="cart__top"
                    points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                    strokeDasharray="338 338"
                    strokeDashoffset={-338}
                  />
                  <g className="cart__wheel1" transform="rotate(-90,43,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx={43}
                      cy={111}
                      r={13}
                      strokeDasharray="81.68 81.68"
                      strokeDashoffset="81.68"
                    />
                  </g>
                  <g className="cart__wheel2" transform="rotate(90,102,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx={102}
                      cy={111}
                      r={13}
                      strokeDasharray="81.68 81.68"
                      strokeDashoffset="81.68"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <div className="preloader__text">
              <p className="preloader__msg">Bringing you the goods…</p>
              <p className="preloader__msg preloader__msg--last font-bold text-2xl">
                Empty Cart
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
