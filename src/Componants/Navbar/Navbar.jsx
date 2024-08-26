import { useContext } from "react";
import logo from "../../assets/—Pngtree—e-letter logo ecommerce shop store_7265997.png";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "./../../Context/UserLogin";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserLogin);
  let { favProducts1, cartItems } = useContext(CartContext);
  let navegate = useNavigate();
  function signout() {
    setuserLogin(null);
    localStorage.removeItem("token");
    navegate("/login");
  }

  return (
    <>
      <nav className="z-50 border-gray-200 bg-slate-100 fixed top-0 left-0 right-0">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-3">
          <div
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Link to="">
              <img
                src={logo}
                className="w-[60px] h-[60px]"
                alt="Flowbite Logo"
              />
            </Link>
            {userLogin != null ? (
              <ul className="flex gap-3 md:gap-4">
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="cart">Cart</Link>
                </li>
                <li>
                  <Link to="products">Products</Link>
                </li>
                <li>
                  <Link to="categories">Categories</Link>
                </li>
                <li>
                  <Link to="brands">Brands</Link>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="register flex gap-1 md:ms-auto me-4 ms-3">
            {userLogin != null ? (
              <div className="flex gap-5 ">
                <Link
                  to="wishlist"
                  className="relative  inline-flex items-center p-3 text-sm font-medium text-center text-white bg-slate-200 rounded-lg hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                >
                  <i className="fa-solid fa-heart text-red-600"></i>
                  <span className="sr-only">Notifications</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {favProducts1}
                  </div>
                </Link>
                <Link
                  to="cart"
                  className="relative  inline-flex items-center p-3 text-sm font-medium text-center text-white bg-slate-200 rounded-lg hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                >
                  <i className="fa-solid fa-cart-shopping text-green-500"></i>
                  <span className="sr-only">Notifications</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {cartItems}
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="logos lg:flex hidden gap-3">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-tiktok"></i>
              <i className="fab fa-twitter"></i>
            </div>

            <div className="register flex gap-1">
              {userLogin != null ? (
                <span onClick={signout} className="text-sm cursor-pointer">
                  <button
                    type="button"
                    className="text-white bg-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    SignOut
                  </button>
                </span>
              ) : (
                <>
                  <Link to="login" className="text-sm ">
                    <button
                      type="button"
                      className="text-white bg-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="register" className="text-sm ">
                    <button
                      type="button"
                      className="text-white bg-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
