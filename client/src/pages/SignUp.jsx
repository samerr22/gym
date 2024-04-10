import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cat from "../img/fff.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Plese fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
          <div className="w-[650px]   h-[480px] bg-white rounded-3xl">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <h1 className="text-2xl mt-2 mb-2 ml-60 font-serif">
                  Register Now
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex gap-5">
                    <div>
                      <h3 className="font-semibold text-slate-400 ml-1">
                        Username
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={handlchange}
                      />
                      <h3 className="font-semibold text-slate-400 ml-1">
                        Email
                      </h3>

                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                        type="email"
                        placeholder="name@company.com"
                        id="email"
                        onChange={handlchange}
                      />
                      <h3 className="font-semibold text-slate-400 ml-1">
                        Password
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handlchange}
                      />
                      <h3 className="font-semibold text-slate-400 ml-1">
                        Name
                      </h3>
                      <input
                        className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                        type="text"
                        placeholder="Name"
                        id="Name"
                        onChange={handlchange}
                      />
                    </div>

                    <div>
                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Address
                        </h3>
                        <input
                          className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                          type="text"
                          placeholder="Address"
                          id="Address"
                          onChange={handlchange}
                        />
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Phone
                        </h3>
                        <input
                          className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                          type="text"
                          placeholder="Phone Number"
                          id="PhoneNumber"
                          onChange={handlchange}
                        />
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Height
                        </h3>
                        <input
                          className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                          type="text"
                          placeholder="Height"
                          id="Height"
                          onChange={handlchange}
                        />
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Weight
                        </h3>
                        <input
                          className=" bg-slate-100 p-3 rounded-lg w-[300px] h-11"
                          type="text"
                          placeholder="Weight"
                          id="weight"
                          onChange={handlchange}
                        />
                      </div>

                      <div></div>
                    </div>
                  </div>

                  <button
                    className=" bg-yellow-300 text-black shadow-md shadow-black p-3 ml-36 rounded-lg w-[300px] h-11 hover:opacity-90"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <sapn className="pl-3">Loading...</sapn>
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
                <div className="flex gap-2 text-sm ml-36 mt-5">
                  <span>Have an account?</span>
                  <Link to="/sign-in" className="text-blue-500">
                    Sign In
                  </Link>
                </div>
                {errorMessage && (
                  <p className="mt-5 text-black bg-yellow-300 w-300 h-7 rounded-lg text-center ">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
