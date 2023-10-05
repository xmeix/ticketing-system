import "./Navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/apiCalls/auth";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar flex-row justify-between align-center">
      <div className="nav-title">TicketTrac</div>
      <div className="nav-params flex-row align-center">
        <div className="nav-user">
          #{user.last_name}_{user.first_name}
        </div>

        <Tooltip title="déconnexion">
          <LogoutIcon className="icon-btn" onClick={() => handleLogout()} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
