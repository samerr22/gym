import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isDropdownOpen &&
        event.target.closest(".dropdown-menu") === null &&
        event.target.closest("button") === null
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-black">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold text-yellow-300 ">GYm</h1>
        </Link>
        
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-yellow-300 ">Home</li>
          </Link>

          {currentUser && currentUser.ismanger && (
            <Link to="/dashbord">
              <li className="text-yellow-300">Dashbord</li>
            </Link>
          )}

          {currentUser ? (
            <>
              <Link to="/form">
                <button className='text-yellow-300'>Contact Us</button>
              </Link>
              <Link to="/feed">
                <button className='text-yellow-300 '>FeedBack</button>
              </Link>
              <Link to="/viewnotifi">
                <button className='text-yellow-300 '>Notification</button>
              </Link>

              <Link to={'/dashprofil'}>
                <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
              </Link>
            </>
          ) : (
            <Link to="/sign-in" >
              <li className="text-yellow-300 ">Sing In</li>
            </Link>
          )}

        </ul>
      </div>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
