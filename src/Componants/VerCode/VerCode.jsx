import { useState } from "react";
import iamge from "../../assets/istockphoto-1408198289-612x612.jpg";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function VerCode() {
  const [spinner, setspinner] = useState(false);
  let navegate = useNavigate();
  function Resetcode(resetCode) {
    setspinner(true);
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: `${resetCode}`,
      })
      .then((res) => {
        setspinner(false);
        return res;
      })
      .catch((res) => res);
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handelSubmit,
  });

  async function handelSubmit() {
    let res = await Resetcode(formik.values.resetCode);
    if (res.data.status == "Success") {
      navegate("/resetPassword");
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col mt-5">
        <img
          src={iamge}
          className="w-[600px] h-[100px] object-cover mb-5"
          alt=""
        />
        <form onSubmit={formik.handleSubmit} className="w-1/2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              name="resetCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              type="number"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Please Enter Your resetCode..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
              <div className="balls-color"></div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
