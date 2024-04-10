import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dash from "../components/sideDash";
import Cat from "../img/fff.jpg";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [User, setUser] = useState([]);
  const [userDelete, setuserToDelete] = useState("");
  console.log("sameea", User);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/auth/getUser`);
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            setUser(data.user);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchitems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/deleteuser/${userDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => prev.filter((user) => user._id !== userDelete));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...User]);
    } else {
      // If there's a query, filter the data
      const filteredData = User.filter(
        (user) =>
        user.email &&  user.email.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, User]);






  return (
    

    <div>
    

    <div className="h-[600px] relative"> {/* Added relative class */}
        <img src={Cat} alt="" className="w-full h-full object-cover" /> 
        <div className="absolute top-0 left-0">   {/* Positioned Dash component here */}
              <Dash />
            </div> {/* Added object-cover class */}
            <div className="ml-8 mt-[-600px] flex justify-center items-center">
        <form>
          <input
            type="text"
            placeholder="Search... "
            className=" w-[300px] h-8 mt-6 rounded-lg shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
        
        <div className="w-[1000px]  h-[400px] bg-white rounded-3xl">
        <div className="max-h-80 mt-4 overflow-y-auto">
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.ismanger ? (
        <>
          <table className="w-full divide-y divide-gray-200 shadow-md">
            <thead className="bg-black bg-opacity-20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  user name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">

            {filter && filter.length > 0 ? (
              <>
              {filter.map((user) => (
                <tr
                  key={user._id}
                  className="bg-black bg-opacity-50 text-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.profilePicture}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.PhoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.Address}
                  </td>

                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      onClick={() => {
                        setuserToDelete(user._id);
                        handleDeleteUser();
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
              
              </>  ) : (
                        <p>You have no items yet</p>
                      )}
            </tbody>
          </table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
       </div>
      </div>

        </div>
      </div>




     









    
    </div>
  );
}
