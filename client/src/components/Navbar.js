import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, logoutUser } from "../store/user-slice";
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>

        <div>
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button onClick={() => dispatch(logoutUser())} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
