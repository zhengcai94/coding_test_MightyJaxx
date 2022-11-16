import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../store/user-slice";
import { useDispatch } from "react-redux";

const NavLinks = ({ toggle }) => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            key={id}
            onClick={toggle && (() => dispatch(toggleSidebar()))}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
