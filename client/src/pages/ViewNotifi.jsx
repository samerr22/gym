import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
import Cat from "../img/fff.jpg";
import jsPDF from "jspdf";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [Notifi, setNotifi] = useState([]);
  const [notifiId, setnotifiId] = useState("");

  console.log("arra", Notifi);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/auth/getNotifi`);
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            setNotifi(data.Notfi);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);


  const  handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/deleteNotif/${notifiId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setNotifi((prev) => prev.filter((Notifii) => Notifii._id !== notifiId));
        alert("delete succesfull")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    // Add house details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, "Feedback Details:");
    yPos += 10;

    Notifi.forEach((notifi) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `Tilte: ${notifi.tilte}`);
      doc.text(20, yPos + 5, `Date: ${notifi.createdAt}`);
      doc.text(20, yPos + 10, `Description: ${notifi.desc}`);
      yPos += 25;
    });

    // Save the PDF
    doc.save("Notification_gmy.pdf");
  };


  

  

  return (



    <div>
    <div className="relative h-[600px]">
      <img src={Cat} alt="" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
        <h1 className="text-4xl font-serif text-white mt-10">Notification</h1>
        {currentUser?.ismanger && (
            <>
              <div className="flex justify-center items-center  mt-4 gap-2">
                <button
                  className="hidden sm:inline  hover:underline bg-yellow-300 hover:opacity-55 text-black font-bold py-2 px-4  rounded-full"
                  type="button"
                  onClick={() => generatePDF()}
                  
                >
                  Generate Report
                </button>
              </div>
            </>
          )}
        <div className="max-h-[450px] overflow-y-auto mt-10">
        <div className="flex flex-wrap justify-center mt-6 gap-8">
          {Notifi && Notifi.length > 0 ? (
            <>
              {Notifi.map((notifi, index) => (
                <div key={index} className="w-[600px] h-[250px] mt-10 mb-4 rounded shadow-xl bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg p-4">
                  <div className="font-serif text-2xl mb-2 max-w-[100px] break-words">{notifi.tilte}</div>
                  <p className="text-white text-sm">{moment(notifi.createdAt).format('YYYY MMMM Do, h:mm:ss a')}</p>
                  <div className="text-white max-w-[200px] break-words">{notifi.desc}</div>
                  {currentUser?.ismanger && (
            <>
              <div className="flex justify-center items-center mt-2">
                                <span
                                  onClick={() => {
                                    setnotifiId(notifi._id);
                                    handleDelete();
                                  }}
                                  className="hidden sm:inline  hover:underline bg-yellow-300 hover:opacity-90 text-black font-bold py-2 px-4  rounded-full cursor-pointer"
                                >
                                  Delete
                                </span>
                              </div>
            </>
          )}
                </div>
              ))}
             
            </>
          ) : (
            <p className="text-white">You have no items yet</p>
          )}
        </div>
        </div>
      </div>
    </div>
  </div>
  );
}
