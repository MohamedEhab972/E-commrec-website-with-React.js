import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConterContextProvider from "./Context/CounterContext";
import UserLoginProvider from "./Context/UserLogin";
import ProtectedRoute from "./Componants/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Componants/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishList from "./Componants/WishList/WishList";
import Checkout from "./Componants/Checkout/Checkout";
import CheckoutContextProvider from "./Context/CheckoutContext";
import ForgetPassword from "./Componants/ForgetPassword/ForgetPassword";
import VerCode from "./Componants/VerCode/VerCode";
import ResetPassword from "./Componants/ResetPassword/ResetPassword";
import Layout from "./Componants/Layout/Layout";
import Home from "./Componants/Home/Home";
import Brands from "./Componants/Brands/Brands";
import Cart from "./Componants/Cart/Cart";
import Categories from "./Componants/Categories/Categories";
import Login from "./Componants/Login/Login";
import Register from "./Componants/Register/Register";
import Notfound from "./Componants/Notfound/Notfound";
import Products from "./Componants/Products/Products";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "verCode", element: <VerCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "productdetailes/:id/:cat",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserLoginProvider>
          <ConterContextProvider>
            <CartContextProvider>
              <CheckoutContextProvider>
                <RouterProvider router={x}></RouterProvider>
                <Toaster />
              </CheckoutContextProvider>
            </CartContextProvider>
            <ReactQueryDevtools></ReactQueryDevtools>
          </ConterContextProvider>
        </UserLoginProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
