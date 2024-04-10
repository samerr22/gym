import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export default function DashUsers() {
  
  const [Feed, setFeed] = useState([]);
  
  

  
  const { currentUser } = useSelector((state) => state.user);
  
  const CurrentuseId = currentUser ? currentUser._id : null;
  const [FeedbackId, setFeedbackId] = useState("");

  console.log(CurrentuseId)
 
  

  
  
  
 


//feedback display useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/gefeed/${CurrentuseId}`);
        const data = await response.json();
        console.log("dataa",data)
        
        

        

        if (response.ok) {
          setFeed(data.Feed); 

        } else {
          setFeed([]); 
         
          
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [CurrentuseId]);
  


 
//delete warehouse
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/deletefeed/${FeedbackId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFeed((prev) =>
          prev.filter((hous) => hous._id !== FeedbackId)
        );
        
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  



 






 


  
  

  return (
   
   <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     <div className="ml-8 mt-7 flex justify-center items-center">
        
        
      </div>
      {Feed && Feed.length > 0 ? (
        <>
          <table className="w-full divide-y divide-gray-200 shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                 Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Edit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Delete
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">



            
               {Feed.map((hous) => (
                <tr
                  key={hous._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{hous.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {hous.Email}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">{hous.descrp}</td>


                 

                 
                  
                  <td className="px-6 py-4 whitespace-nowrap">


                    
                    <Link
                      to={`/update-warehous/${hous._id}`}
                      className="text-teal-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      onClick={() => {
                        
                        handleDeleteUser();
                        setFeedbackId(hous._id);
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
             
            



            
  
 

            </tbody>
          </table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
}