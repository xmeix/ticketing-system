import { useDispatch, useSelector } from "react-redux";
import "./DropMenu.css";
import { logout } from "../../store/apiCalls/auth";
import { NavLink, useNavigate } from "react-router-dom";
const DropMenu = ({ reference }) => {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);

  return (
    <div ref={reference} className="drop-menu">
      <ul className="drop-menu-ul">
        <li className="drop-menu-li">notification</li>
        <li className="drop-menu-li">notification</li>
        <li className="drop-menu-li">notification</li>
      </ul>
    </div>
  );
};

export default DropMenu;
