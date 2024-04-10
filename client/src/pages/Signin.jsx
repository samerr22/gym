import { Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSilce";
import Cat from "../img/fff.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashprofil");
      }
    } catch (error) {
      console.error("An error occurred while signing in:", error);
      dispatch(
        signInFailure(
          "An error occurred while signing in. Please try again later."
        )
      );
    }
  };

  return (
    <div>
      <div className="h-[600px] relative">
        {" "}
        {/* Added relative class */}
        <img src={Cat} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0">
          {" "}
          {/* Positioned Dash component here */}
        </div>{" "}
        {/* Added object-cover class */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
          <div className="w-[500px]   h-[350px] bg-white rounded-3xl">
            <div className=" ">
              <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <h1 className="text-2xl mt-2 mb-2 ml-44 font-serif">
                    Login Now
                  </h1>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <h3 className="font-semibold text-slate-400 ml-1">
                        Email
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                        type="email"
                        placeholder="name@company.com"
                        id="email"
                        onChange={handlchange}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-400 ml-1">
                        Password
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handlchange}
                      />
                    </div>
                    <button
                      className=" bg-yellow-300 text-black shadow-sm shadow-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <sapn className="pl-3">Loading...</sapn>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>
                  <div className="flex gap-2 text-sm mt-5">
                    <span>Dont Have an account?</span>
                    <Link to="/sign-up" className="text-blue-500">
                      Sign Up
                    </Link>
                  </div>
                  {errorMessage && (
                    <p className="mt-5 text-black bg-yellow-300 w-30 h-7 rounded-lg text-center ">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
