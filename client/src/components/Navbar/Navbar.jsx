import "./Navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/apiCalls/auth";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { NavLink } from "react-router-dom";
import { resetTicket } from "../../store/slices/ticketSlice";
import { reset } from "../../store/slices/authSlice";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { useEffect, useRef, useState } from "react";
import DropMenu from "../dropMenu/DropMenu";
import { getNotifications } from "../../store/apiCalls/notification";
import { resetNotification } from "../../store/slices/notificationSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [openDropMenu, setOpenDropMenu] = useState(false);
  const dispatch = useDispatch();
  const subMenuRef = useRef(null);

  const toggleDropMenu = () => {
    setOpenDropMenu(true);
  };
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleOutsideClick = (event) => {
    if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
      setOpenDropMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(resetTicket());
    await dispatch(resetNotification())
    dispatch(reset());
    
  };

  return (
    <div className="navbar flex-row justify-between align-center">
      <NavLink to={"/"} className="nav-title navlink">
        TicketTrac.
      </NavLink>
      <div className="nav-params flex-row align-center">
        <div className="nav-user">
          #{user?.last_name}_{user?.first_name}
        </div>
        {user?.role === "AFR" && (
          <NotificationsRoundedIcon
            className="icon-btn"
            onClick={() => setOpenDropMenu(true)}
          />
        )}
        {user?.role === "AFR" && openDropMenu && (
          <DropMenu reference={subMenuRef} />
        )}

        {user?.role === "ADM" && (
          <Tooltip title="ajouter assistante">
            <NavLink to={"/register"} className={"navlink"}>
              <PersonAddAlt1RoundedIcon className="icon-btn" />
            </NavLink>
          </Tooltip>
        )}
        <span className="icon-btn" onClick={() => handleLogout()}>
          <Tooltip title="déconnexion">
            <LogoutIcon />
          </Tooltip>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
