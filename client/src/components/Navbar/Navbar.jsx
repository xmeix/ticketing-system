import "./Navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@material-ui/core";
const Navbar = () => {
  return (
    <div className="navbar flex-row justify-between align-center">
      <div className="nav-title">TicketTrac</div>
      <div className="nav-params flex-row align-center">
        <div className="nav-user">#boualouache lamia</div>
        <Tooltip title="déconnexion">
          <LogoutIcon className="icon-btn" />
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
