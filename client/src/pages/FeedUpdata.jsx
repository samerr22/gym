
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";



export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const CurrentuseId = currentUser ? currentUser._id : null;
  const {feedId} = useParams();
  console.log(formData)
  console.log("id",feedId)


  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(
          `http://localhost:3000/api/auth/gefeed/${CurrentuseId}?FeedId=${feedId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedhouse = data.Feed.find(
            (hous) => hous._id === feedId
          );
          if (selectedhouse) {
            setFormData(selectedhouse);
          }
        }
      };
      fetchouse();
    } catch (error) {
      console.log(error.message);
    }
  }, [feedId]);







  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //updatewareHouse
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/updatefeed/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        navigate(`/Feedpage`);
      }
    } catch (error) {
        setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <h3 className="font-semibold text-slate-400 ml-1">Enter your name</h3>
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Name"
                id="name"
                onChange={handlchange}
                value={formData.name}
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
                value={formData.Email}
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
                value={formData.type}
              />
              <h3 className="font-semibold text-slate-400 ml-1">Feedbak</h3>
              <textarea
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-40"
                type="text"
                placeholder="descrp"
                id="descrp"
                onChange={handlchange}
                value={formData.descrp}
              />
             
              
             
            </div>
            <button
              className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
             
            >
              Update
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
  );
}
