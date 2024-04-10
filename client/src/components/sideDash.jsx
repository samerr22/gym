import {  HiChartPie } from "react-icons/hi";

import { Link,  } from "react-router-dom";


import { useSelector } from "react-redux";

export default function DashSidebar() {
  
 
  const { currentUser } = useSelector((state) => state.user);
  
 






  return (
    <div className=" hidden flex-col flex-shrink-0 p-3 bg-black bg-opacity-40 w-56 h-[600px]  lg:block">
      <ul className="flex flex-col space-y-1 mb-auto">
        {currentUser && currentUser && (
          <li className="nav-item">
            <Link to="/dashbord" className={`block py-2 px-4 rounded-lg hover:bg-gray-200 bg-opacity-60 text-white `}>
              <HiChartPie className="inline-block w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
        )}
        <li className="">
          <Link to="/viewuser" className={`block py-2 px-4 rounded-lg text-white hover:bg-gray-200 `}>
          
            all user
          </Link>
        </li>
        <li className="">
          <Link to="/dashprofil" className={`block py-2 px-4 rounded-lg text-white hover:bg-gray-200 `}>
          
           profile
          </Link>
        </li>
        <li className="">
          <Link to="/notification" className={`block py-2 px-4 rounded-lg text-white hover:bg-gray-200 `}>
          
            Add notification 
          </Link>
        </li>
        <li className="">
          <Link to="/viewuserall" className={`block py-2 px-4 rounded-lg text-white hover:bg-gray-200 `}>
          
            all Feedback 
          </Link>
        </li>

       
        
      </ul>
      <hr className="my-2 border-gray-300" />
      
    </div>
  );
}
