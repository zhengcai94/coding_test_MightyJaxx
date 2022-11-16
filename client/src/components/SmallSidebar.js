import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../store/user-slice";
import NavLinks from "./NavLinks";

export const SmallSidebar = () => {
  const { showSidebar } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <h1>Sneaker App</h1>
          </header>
          <NavLinks toggle={true} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
