import  { useState } from "react";
import iamge from "../../assets/360_F_492751838_Ybun2zwpQC8AZv11AwZLdXJk4cUrTt5z.jpg";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [spinner, setspinner] = useState(false);
  let navegate = useNavigate();
  function forgetPassword({ email }) {
    setspinner(true);
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((res) => {
        setspinner(false);
        return res;
      })
      .catch((res) => res);
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handelSubmit,
  });

  async function handelSubmit() {
    await forgetPassword(formik.values);
    navegate("/verCode");
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col mt-5">
        <img src={iamge} className="w-[500px] h-[500px] mb-5" alt="" />
        <form onSubmit={formik.handleSubmit} className="w-1/2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Please Enter Your Email..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
        {spinner == true ? (
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-50 opacity-70 flex justify-center items-center">
            <div className="lds-ellipsis opacity-100">
              <div className="balls-color"></div>
              <div className="balls-color"></div>
              <div className="balls-color"></div>
              <div className="balls-color" ></div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
