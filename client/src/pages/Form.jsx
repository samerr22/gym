
import { useState } from "react";

import Cat from "../img/fff.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});

 
 
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(formData)

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {



     
     
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/api/auth/Formcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
     
      if(res.ok){
        alert("succefull")
      }
    } catch (error) {
      setErrorMessage(error.message);
      
    }
  };


  return (

    <div>


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

           <div className="w-[490px] mt-[-60px]  h-[550px] bg-white rounded-3xl">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        

        <div className="flex-1">
          <h1 className="text-2xl mt-2 mb-2 ml-44 font-serif">Contact Us</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
           
            
          <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                         Select
                        </h3>
                        <select
                          className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 "
                          id="category"
                          onChange={handlchange}
                          
                        >
                          <option value="">Select </option>
                          <option value="doctor">Doctor</option>
                          <option value="Traineer">Traineer</option>
                        </select>
                      </div>



            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Name</h3>
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Name"
                id="name"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Phone</h3>
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Phone"
                id="phone"
                maxLength={10}
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Description</h3>
              <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-28"
                type="text"
                placeholder="Description"
                id="desc"
                onChange={handlchange}
              />
            </div>
            <button
              className=" bg-yellow-300 text-black  shadow-sm shadow-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              
            >
              submit
            </button>
         
          </form>
          
          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
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
