import { useState } from "react";
import iamge from "../../assets/6357048.png";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [spinner, setspinner] = useState(false);
  let navegate = useNavigate();
  function ResetPassword({ email, newPassword }) {
    setspinner(true);
    return axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
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
      newPassword: "",
    },
    onSubmit: handelSubmit,
  });

  async function handelSubmit() {
    // console.log(formik.values);

    await ResetPassword(formik.values);
    navegate("/login");
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col mt-5">
        <img src={iamge} className="w-[300px] h-[300px]  mb-5" alt="" />
        <form onSubmit={formik.handleSubmit} className="w-3/4 md:w-1/2 ">
          <h2 className="font-bold text-4xl text-center mb-5 text-emerald-600">
            Reset Password
          </h2>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
              id="email"
              className="my-8 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              name="newPassword"
              type="password"
              id="newPassword"
              className="mt-8 mb-3 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your newPassword
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Submit
          </button>
        </form>
        {spinner == true ? (
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-50 opacity-70 flex justify-center items-center">
            <div className="lds-ellipsis opacity-100">
              <div className="balls-color"></div>
              <div className="balls-color"></div>
              <div className="balls-color"></div>
              <div className="balls-color"></div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
