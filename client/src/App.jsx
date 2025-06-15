import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CheckBMI from "./components/CheckBMI";
import DashProfile from "./components/DashProfile";
import PrivateRoute from "./components/PrivateRoute";
import PrivateManger from "./components/PrivateManger";

import Feed from "./pages/Feedback";
import Getfeed from "./pages/GetFeedback";
import Feedup from "./pages/FeedUpdata";
import Form from "./pages/Form";
import Notifi from "./pages/Notification";
import ViewNotifi from "./pages/ViewNotifi";
import Dashbord from "./pages/Dashbord";
import Viewuser from "./pages/ViewUser";
import Viewuserall from "./pages/Viewallfeedback";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
       
       

        <Route element={<PrivateRoute />}>
         
        
          <Route path="/update-warehous/:feedId" element={<Feedup />} />
          <Route path="/form" element={<Form/>} />
          <Route path="/viewnotifi" element={<ViewNotifi/>} />
        
          
        </Route>


        <Route element={<PrivateManger />}>
      
        <Route path="/notification" element={<Notifi/>} />
      
        <Route path="/viewuser" element={<Viewuser/>} />
        <Route path="/viewuserall" element={<Viewuserall/>} />
        
        
        </Route>

        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
