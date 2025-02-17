
import { useState } from "react";
import { useSelector } from "react-redux";

import Cat from "../img/fff.


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const { currentUser } = useSelector((state) => state.user);

 console.log(currentUser)

 
  console.log(formData)



  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {

        const feedbak = {
            ...formData,
            CurrentuseId: currentUser._id
          }




      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/api/auth/Fcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbak),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        alert("successfull")
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
        <div className="w-[490px]  mt-[-40px]  h-[580px] bg-white rounded-3xl">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        

        <div className="flex-1">
        <h1 className="text-2xl mt-2 mb-2 ml-44 font-serif">
                 FeedBack
                </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Enter your name</h3>
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Name"
                id="name"
                onChange={handlchange}
              />
            </div>
            <div>
             <h3 className="font-semibold text-slate-400 ml-1">Email</h3>


              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="email"
                placeholder="name@company.com"
                id="Email"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">type</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="type"
                id="type"
                onChange={handlchange}
              />
              <h3 className="font-semibold text-slate-400 ml-1">Feedbak</h3>
              <textarea
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-40"
                type="text"
                placeholder="descrp"
                id="descrp"
                onChange={handlchange}
              />
             
              
             
            </div>
            <button
              className=" bg-yellow-300 text-black shadow-md shadow-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {
              loading ? (
                <>
                  
                  <sapn className="pl-3">Loading...</sapn>
                </>
              ) : (
                "Submit"
              )}
            </button>
        
          </form>
          
          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center " >
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
