import { useDispatch, useSelector } from "react-redux";
import "./DropMenu.css";
import { logout } from "../../store/apiCalls/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { getDate, getTime } from "../../utils/utilFunctions";
const DropMenu = ({ reference }) => {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);

  return (
    <div ref={reference} className="drop-menu">
      <ul className="drop-menu-ul">
        {notifications.map((notification) => (
          <li className="drop-menu-li">
            <div className="notification-content">{notification.content}</div>
            <div className="notification-time">
              {getDate(notification)} {getTime(notification)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropMenu;
