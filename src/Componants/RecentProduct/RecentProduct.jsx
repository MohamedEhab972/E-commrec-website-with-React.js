import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Label, TextInput } from "flowbite-react";

export default function RecentProduct() {
  const [data1, setdata1] = useState([]);
  let {
    addToCart,
    addProductToWishlist,
    setfavProducts1,
    setcartItems,
    setIdProduct1,
    IdProduct1,
    removeProductFromWishlist,
  } = useContext(CartContext);
  let { data, error, isError, isFetching } = useProducts();

  function getSpecific(params) {
    let x = data.filter((product) =>
      product.title.toLowerCase().includes(params.toLowerCase())
    );
    setdata1(x);
  }

  const [spinner, setspinner] = useState(false);
  const [IdProduct, setIdProduct] = useState("");

  let wayAddToCart = async (id) => {
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
  };

  let wayremoveProductFromWishlist = async (id) => {
    let res = await removeProductFromWishlist(id);
    console.log(res);
    if (res.data.status == "success") {
      setIdProduct1(res.data.data);
      localStorage.setItem("favproducts", JSON.stringify(res.data.data));
      setfavProducts1(res.data.data.length);
      localStorage.setItem("favrNum", JSON.stringify(res.data.data.length));
      toast.success("The product remove successfully");
    } else {
      toast.error(res.data.message);
    }
  };

  let wayaddProductToWishlist = async (id) => {
    let res = await addProductToWishlist(id);
    console.log(res);
    if (res.data.status == "success") {
      setIdProduct1(res.data.data);
      localStorage.setItem("favproducts", JSON.stringify(res.data.data));
      setfavProducts1(res.data.data.length);
      localStorage.setItem("favrNum", JSON.stringify(res.data.data.length));
      toast.success(res.data.message);
    } else {
      toast(res.data.message);
    }
  };

  if (isError) {
    console.log(error.message);
  }

  if (isFetching) {
    return (
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
    );
  }

  // const [productes, setproductes] = useState([]);
  // function getProductes() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setproductes(res.data.data);
  //     })
  //     .catch((res) => {
  //       console.log(res.data.data);
  //     });
  // }

  // useEffect(() => {
  //   getProductes();
  // }, []);
  return (
    <>
      <div className="mt-[140px] md:mt-[100px] p-5">
        <div className="mb-2 block">
          <Label
            className="text-xl font-bold"
            htmlFor="text"
            value="Search for specific product"
          />
        </div>
        <TextInput
          onChange={(e) => {
            getSpecific(e.target.value);
          }}
          id="text"
          type="text"
          placeholder="Product Name"
          required
        />
      </div>

      <div className="row justify-center  mt-10">
        {data1.length > 0
          ? data1?.map((product) => (
              <div
                key={product.id}
                className="col w-6/6 sm:w-2/4 md:w-2/6 lg:w-1/6 my-3 p-5 relative"
              >
                {/* <i
              onClick={() => {
                wayaddProductToWishlist(product.id);
              }}
              className="fa-solid fa-heart absolute top-8 right-8 cursor-pointer text-red-600"
            ></i> */}
                <section
                  onClick={() => {
                    IdProduct1.includes(product.id)
                      ? wayremoveProductFromWishlist(product.id)
                      : wayaddProductToWishlist(product.id);
                  }}
                  className="ac-footer absolute top-6 right-12 cursor-pointer"
                >
                  <div className="ac-footer-container ac-footer-brand">
                    {IdProduct1.includes(product.id) ? (
                      <i className="fa-solid fa-heart text-red-600"></i>
                    ) : (
                      <i className="fa-solid fa-heart"></i>
                    )}
                  </div>
                </section>

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
          : data?.map((product) => (
              <div
                key={product.id}
                className="col w-6/6 sm:w-2/4 md:w-2/6 lg:w-1/6 my-3 p-5 relative"
              >
                {/* <i
              onClick={() => {
                wayaddProductToWishlist(product.id);
              }}
              className="fa-solid fa-heart absolute top-8 right-8 cursor-pointer text-red-600"
            ></i> */}
                <section
                  onClick={() => {
                    IdProduct1.includes(product.id)
                      ? wayremoveProductFromWishlist(product.id)
                      : wayaddProductToWishlist(product.id);
                  }}
                  className="ac-footer absolute top-6 right-12 cursor-pointer"
                >
                  <div className="ac-footer-container ac-footer-brand">
                    {IdProduct1.includes(product.id) ? (
                      <i className="fa-solid fa-heart text-red-600"></i>
                    ) : (
                      <i className="fa-solid fa-heart"></i>
                    )}
                  </div>
                </section>

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
            ))}
      </div>
    </>
  );
}
