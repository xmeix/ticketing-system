import "./Navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/apiCalls/auth";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { NavLink } from "react-router-dom";
import { resetTicket } from "../../store/slices/ticketSlice";
import { reset } from "../../store/slices/authSlice";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(resetTicket());
    dispatch(reset());
  };

  return (
    <div className="navbar flex-row justify-between align-center">
      <NavLink to={"/"} className="nav-title navlink">
        TicketTrac
      </NavLink>
      <div className="nav-params flex-row align-center">
        <div className="nav-user">
          #{user?.last_name}_{user?.first_name}
        </div>
        {user?.role === "ADM" && (
          <Tooltip title="ajouter assistante">
            <NavLink to={"/register"} className={"navlink"}>
              <PersonAddAlt1RoundedIcon className="icon-btn" />
            </NavLink>
          </Tooltip>
        )}{" "}
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
