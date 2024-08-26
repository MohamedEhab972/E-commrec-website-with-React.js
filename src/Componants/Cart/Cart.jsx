import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getUserCart,
    updateCartProduct,
    removeCartProduct,
    clearUserCart,
    cartProducts1,
    setcartItems,
  } = useContext(CartContext);
  const [cartProducts, setcartProducts] = useState([]);
  const [spinner, setspinner] = useState(false);
  const [IdProduct, setIdProduct] = useState("");
  const [totalPrice, settotalPrice] = useState("");

  async function wayclearUserCart() {
    let res = await clearUserCart();
    if (res.data.message == "success") {
      setcartItems(0);
      setcartProducts([]);
      settotalPrice(res?.data?.data);
    }
  }

  async function waygetUserCart() {
    if (cartProducts1 == 0) {
      return;
    }
    let res = await getUserCart();
    console.log(res);

    let sum = 0;
    for (const el of res.data.data.products.map((product) => product.count)) {
      sum += el;
    }
    if (res?.data?.status == "success") {
      setcartItems(sum);
      setcartProducts(res?.data?.data?.products);
      settotalPrice(res?.data?.data);
    }
  }

  async function wayDeletItemCard(id) {
    setIdProduct(id);
    setspinner(true);
    let res = await removeCartProduct(id);
    console.log(res);
    let sum = 0;
    for (const el of res.data.data.products.map((product) => product.count)) {
      sum += el;
    }
    if (res?.data?.status == "success") {
      setcartItems(sum);
      toast.success("Remove product from cart");
      setcartProducts(res?.data?.data?.products);
      settotalPrice(res?.data?.data);
      setspinner(false);
    }
  }

  async function wayupdateCartProduct(id, count) {
    if (count > 0) {
      setIdProduct(id);
      setspinner(true);
      let res = await updateCartProduct(id, count);
      let sum = 0;
      for (const el of res.data.data.products.map((product) => product.count)) {
        sum += el;
      }
      if (res?.data?.status == "success") {
        setcartItems(sum);
        toast.success("Done");
        setcartProducts(res?.data?.data?.products);
        settotalPrice(res?.data?.data);
        setspinner(false);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    waygetUserCart();
  }, []);

  return (
    <>
      {cartProducts.length > 0 ? (
        <section className="w-3/4 mx-auto min:h-screen py-36">
          <div className="container mx-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="font-bold p-3  bg-slate-200 text-2xl  text-red-600 dark:text-red-500 hover:underline">
                Total price : <span>{totalPrice?.totalCartPrice}</span>
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              wayupdateCartProduct(
                                product.product.id,
                                product.count - 1
                              );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            {/* <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={product.count}
                          required
                        /> */}

                            {spinner && IdProduct == product.product._id ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <span>{product.count}</span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              wayupdateCartProduct(
                                product.product.id,
                                product.count + 1
                              );
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.count * product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => {
                            wayDeletItemCard(product.product._id);
                          }}
                          className="font-medium bg-red-500 cursor-pointer text-white p-3 rounded-lg dark:text-red-500 hover:underline"
                        >
                          {spinner == true &&
                          IdProduct == product.product._id ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            "Remove"
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex items-center px-8 py-6 font-semibold text-gray-900 dark:text-white">
                Do You want to Delete all products from the Cart ?
                <span
                  onClick={() => {
                    wayclearUserCart();
                  }}
                  className="ms-5 font-bold rounded-lg text-center cursor-pointer bg-black text-white p-4 no-underline"
                >
                  Clear Cart
                </span>
              </div>
              <Link to={"/checkout"}>
                <button className="p-5 bg-emerald-500 w-full text-white font-semibold text-xl">
                  <i className="fa-solid fa-money-bill fa-bounce me-2"></i>{" "}
                  Check out
                </button>
              </Link>
            </div>
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
